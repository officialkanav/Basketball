import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { connect } from 'react-redux';


class Scoreboard extends React.PureComponent{

    didBlurSubscription = null
    
    constructor(props){
        super(props)
        this.listData = []
        this.state = {
            numberOfItemsInList: 0,
            buttonColors : ['gray','silver','gray']
        }
    }
    
    componentDidMount(){
        didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.dispatch({type:'sortByScores'})
                this.listData = []
                this.setState({numberOfItemsInList: 0})
                this.getListData()
            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // update after sorting
        if(prevProps!=this.props){
            this.listData = []
            this.setState({numberOfItemsInList: 0},()=>{this.getListData()})    
        }

    }

    componentWillUnmount(){
        didBlurSubscription.remove();
    }

    getListData = ()=>{
        if(this.state.numberOfItemsInList+15 < this.props.data.length){
            this.listData = this.listData.concat(
                this.props.data.slice(this.state.numberOfItemsInList, this.state.numberOfItemsInList+15)
            )
            this.setState({numberOfItemsInList: this.state.numberOfItemsInList+15})
        }
        else if(this.state.numberOfItemsInList == this.props.data.length){
        }
        else{
            this.listData = this.listData.concat(
                this.props.data.slice(this.state.numberOfItemsInList, this.props.data.length)
            )
            this.setState({numberOfItemsInList: this.props.data.length})
        }
    }

    getNumberOfContents = ()=>{
        return(
            <View style = {{width:450,height:40, backgroundColor:'gray'}}>
                <Text style = {{alignSelf:'center', fontSize:25}}>{'Displaying: '+this.listData.length+' / '+this.props.data.length}</Text>
            </View>
        )
    }

    getHeadings = (name, onPressCallback, colorIndex)=>{
        return(
            <View style = {{flexDirection:'row', flex:1, backgroundColor:this.state.buttonColors[colorIndex]}}>
                <TouchableOpacity style = {{flex:1}}
                    onPress = {onPressCallback}>
                    <Text style = {{fontWeight:'500',fontSize:25, alignSelf:'center'}}>{name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onPressScoreCallback = ()=>{
        this.setState({buttonColors:['gray','silver','gray']})
        this.props.dispatch({type:'sortByScores'})
    }

    onPressDateCallback = ()=>{
        this.setState({buttonColors:['gray','gray','silver']})
        this.props.dispatch({type:'sortByDate'})
    }

    onPressNameCallback = ()=>{
        this.setState({buttonColors:['silver','gray','gray']})
        this.props.dispatch({type:'sortByName'})
    }

    getList = ()=>{

        return(
            <View>
                <FlatList 
                    
                    data = {this.listData} 
                    extraData = {this.props.sortType,this.props.sortingOrder,this.state.numberOfItemsInList}
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
                                {/* hr */}
                                <View style = {{height:2, width:'100%', backgroundColor:'black'}}/>
                            </View>
                        )
                    }}
                    
                    onEndReachedThreshold = {0.001}

                    onEndReached={() => {
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
                {/* count of items displayed*/}
                {this.getNumberOfContents()}
                {/* heading buttons*/}
                <View style = {{flexDirection:'row'}}>
                    <View style = {{flex:1, height:40, flexDirection:'row'}}>
                        {this.getHeadings("Name",this.onPressNameCallback,0)}
                        {this.getHeadings("Score", this.onPressScoreCallback,1)}
                        {this.getHeadings("Date / Time", this.onPressDateCallback,2)}
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
        data: state.ScoreReducer.scoreObject.scores,
        sortingOrder: state.ScoreReducer.scoreObject.type
    }
}

export default higherOrderFirst = connect(mapStateToProps)(Scoreboard)