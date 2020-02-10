import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Button
} from 'react-native'
import { connect } from 'react-redux';


class Scoreboard extends React.PureComponent{

    // listData = [{name:'',score:'',dateAndTime:''}]
    didBlurSubscription = null
    
    constructor(props){
        super(props)
        this.listData = []
        this.state = {
            numberOfItemsInList: 0,
        }
    }
    
    componentDidMount(){
        this.getListData()
        didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
              this.listData = []
              this.setState({numberOfItemsInList: 0})
              this.getListData()
            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        
        if(prevProps!=this.props){
            this.listData = []
            this.setState({numberOfItemsInList: 0},()=>{this.getListData()})    
        }

    }

    componentWillUnmount(){
        didBlurSubscription.remove();
    }

    getListData = ()=>{
        if(this.state.numberOfItemsInList+10 < this.props.data[this.props.sortType].scores.length){
            this.listData = this.listData.concat(this.props.data[this.props.sortType].scores.slice(this.state.numberOfItemsInList, this.state.numberOfItemsInList+10))
            this.setState({numberOfItemsInList: this.state.numberOfItemsInList+10})
        }
        else if(this.state.numberOfItemsInList == this.props.data[this.props.sortType].scores.length){
        }
        else{
            this.listData = this.listData.concat(this.props.data[this.props.sortType].scores.slice(this.state.numberOfItemsInList, this.props.data[this.props.sortType].length))
            this.setState({numberOfItemsInList: this.props.data[this.props.sortType].scores.length})
        }
    }

    getHeadings = (name, onPressCallback)=>{
        return(
            <View style = {{flexDirection:'row', flex:1}}>
                <TouchableOpacity style = {{flex:1}}
                    onPress = {onPressCallback}>
                    <Text style = {{fontWeight:'500',fontSize:25, alignSelf:'center'}}>{name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onPressScoreCallback = ()=>{
        this.props.dispatch({type:'sortByScores'})
    }

    onPressDateCallback = ()=>{
        this.props.dispatch({type:'sortByDate'})
    }

    getList = ()=>{

        return(
            <View>
                <FlatList 
                    
                    data = {this.listData} 
                    extraData = {this.props.sortType,this.state.numberOfItemsInList}
                    showsVerticalScrollIndicator = {false}
                    
                    renderItem = {({item})=>{
                        return(
                            <View>
                                <View style = {{flex:1, flexDirection:'row'}}>
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:30, alignSelf:'center', alignText:'center'}}>{item.name}</Text>
                                    </View>
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:45, alignSelf:'center'}}>{item.score}</Text>
                                    </View>
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:24, alignSelf:'center'}}>{item.dateAndTime.split('/')[0]}</Text>
                                        <Text style = {{fontSize:32, alignSelf:'center'}}>{item.dateAndTime.split('/')[1]}</Text>
                                    </View>
                                    </View>
                                <View style = {{height:2, width:'100%', backgroundColor:'black'}}></View>
                            </View>
                        )
                    }}
                    
                    onEndReachedThreshold = {0.2}

                    onEndReached={() => {
                        // setTimeout(()=>{this.getListData()},100)
                        this.getListData()
                        }
                    }
                />
            </View>
        )
    }
    
    render(){

        return(
            <View style = {{flex:1, backgroundColor:'gray'}}>
                {/* heading */}
                <View style = {{flexDirection:'row'}}>
                    <View style = {{flex:1, height:40, flexDirection:'row'}}>
                        {this.getHeadings("Name",()=>{})}
                        {this.getHeadings("Score", this.onPressScoreCallback)}
                        {this.getHeadings("Date / Time", this.onPressDateCallback)}
                    </View>
                </View>

                {/* hr */}
                <View style = {{height:2, width:'100%', backgroundColor:'black'}}></View>

                {/* FlatList */}
                <View style = {{flex:1, backgroundColor:'#EE891D'}}>
                    {this.getList()}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        sortType: state.scoreReducer.sortType,
        data: state.scoreReducer,
    }
}

export default higherOrderFirst = connect(mapStateToProps)(Scoreboard)