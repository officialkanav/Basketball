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
        this.state = {
            numberOfItemsInList: 0,
        }
    }
    
    componentDidMount(){
        didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
              this.setState({numberOfItemsInList: 0})
            }
        )
    }

    componentWillUnmount(){
        didBlurSubscription.remove();
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
                    
                    data = {this.props.data[this.props.sortType].scores} 
                    extraData = {this.props.sortType, this.state.numberOfItemsInList}
                    showsVerticalScrollIndicator = {false}
                    maxToRenderPerBatch = {10}

                    renderItem = {({item})=>{
                        return(
                            <View>
                                <View style = {{flex:1, flexDirection:'row'}}>
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:27, alignSelf:'center', alignText:'center'}}>{item.name}</Text>
                                    </View>
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:40, alignSelf:'center'}}>{item.score}</Text>
                                    </View>
                                    <View style = {{flex:1, justifyContent:'center'}}>
                                        <Text style = {{fontSize:27, alignSelf:'center'}}>{item.dateAndTime.split('/')[0]}</Text>
                                        <Text style = {{fontSize:27, alignSelf:'center'}}>{item.dateAndTime.split('/')[1]}</Text>
                                    </View>
                                    </View>
                                <View style = {{height:2, width:'100%', backgroundColor:'black'}}></View>
                            </View>
                        )
                    }}
                    
                    onEndReachedThreshold = {0}
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
                <View style = {{flex:1, backgroundColor:'orange'}}>
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