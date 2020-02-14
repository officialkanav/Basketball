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
        if(this.state.numberOfItemsInList+15 < this.props.data[this.props.sortType].scores.length){
            this.listData = this.listData.concat(
                this.props.data[this.props.sortType].scores.slice(this.state.numberOfItemsInList, this.state.numberOfItemsInList+15)
            )
            this.setState({numberOfItemsInList: this.state.numberOfItemsInList+15})
        }
        else if(this.state.numberOfItemsInList == this.props.data[this.props.sortType].scores.length){
        }
        else{
            this.listData = this.listData.concat(
                this.props.data[this.props.sortType].scores.slice(this.state.numberOfItemsInList, this.props.data[this.props.sortType].length)
            )
            this.setState({numberOfItemsInList: this.props.data[this.props.sortType].scores.length})
        }
    }

    getNumberOfContents = ()=>{
        return(
            <View style = {{width:450,height:40, backgroundColor:'gray'}}>
                <Text style = {{alignSelf:'center', fontSize:25}}>{'Displaying: '+this.listData.length+' / '+this.props.data[this.props.sortType].scores.length}</Text>
            </View>
        )
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
                                    {/* Name */}
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:30, alignSelf:'center', alignText:'center'}}>
                                            {item.name}
                                        </Text>
                                    </View>

                                    {/* Score */}
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:45, alignSelf:'center'}}>{item.score}</Text>
                                    </View>

                                    {/* Date and Time */}
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:24, alignSelf:'center'}}>
                                            {item.dateAndTime.split('/')[0]}
                                        </Text>
                                        <Text style = {{fontSize:32, alignSelf:'center'}}>
                                            {item.dateAndTime.split('/')[1]}
                                        </Text>
                                    </View>
                                </View>
                                <View style = {{height:2, width:'100%', backgroundColor:'black'}}/>
                            </View>
                        )
                    }}
                    
                    onEndReachedThreshold = {0.001}

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
                {/* no. of contents */}
                {this.getNumberOfContents()}
                {/* heading buttons*/}
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
        sortType: state.ScoreReducer.sortType,
        data: state.ScoreReducer,
    }
}

export default higherOrderFirst = connect(mapStateToProps)(Scoreboard)