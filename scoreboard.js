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

    listData = []
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
              this.listData = []
              this.getListData()
            }
        )
    }

    componentWillUnmount(){
        didBlurSubscription.remove();
    }

    getListData = ()=>{
        if(this.state.numberOfItemsInList+25 < this.props.data.length){
            this.listData = this.listData.concat(this.props.data.slice(this.state.numberOfItemsInList, this.state.numberOfItemsInList+25))
            this.setState({numberOfItemsInList: this.state.numberOfItemsInList+25})
        }
        else if(this.state.numberOfItemsInList == this.props.data.length){

        }
        else{
            this.listData = this.listData.concat(this.props.data.slice(this.state.numberOfItemsInList, this.props.data.length))
            this.setState({numberOfItemsInList: this.props.data.length})
        }
    }

    getHeadings = (name)=>{
        return(
            <View style = {{flexDirection:'row', flex:1}}>
                <TouchableOpacity style = {{flex:1}}
                    onPress = {()=>{}}>
                    <Text style = {{fontWeight:'500',fontSize:25, alignSelf:'center'}}>{name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    getList = ()=>{
        return(
            <View>
                <FlatList 
                        
                    data = {this.listData} 
                    showsHorizontalScrollIndicator = {true}
                    showsVerticalScrollIndicator = {false}
                    
                    renderItem = {({item})=>{
                        return(
                            <View>
                                <View style = {{flex:1, flexDirection:'row'}}>
                                    <View style = {{flex:1}}>
                                        <Text style = {{fontSize:35, alignSelf:'center'}}>{item.name}</Text>
                                    </View>
                                    <View style = {{flex:1}}>
                                        <Text style = {{fontSize:35, alignSelf:'center'}}>{item.score}</Text>
                                    </View>
                                    <View style = {{flex:1}}>
                                        <Text style = {{fontSize:25, alignSelf:'center'}}>{item.dateAndTime}</Text>
                                    </View>
                                    </View>
                                <View style = {{height:2, width:'100%', backgroundColor:'black'}}></View>
                            </View>
                        )
                    }}
                    
                    onEndReachedThreshold = {0.0001}

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
                {/* heading */}
                <View style = {{flexDirection:'row'}}>
                    <View style = {{flex:1, height:40, flexDirection:'row'}}>
                        {this.getHeadings("Name")}
                        {this.getHeadings("Score")}
                        {this.getHeadings("Date & Time")}
                    </View>
                </View>

                {/* hr */}
                <View style = {{height:2, width:'100%', backgroundColor:'black'}}></View>

                {/* FlatList */}
                <View style = {{flex:1, backgroundColor:'silver'}}>
                    {this.getList()}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.sortReducer.scores
    }
}

export default higherOrderFirst = connect(mapStateToProps)(Scoreboard)