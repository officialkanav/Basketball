import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native'


export default class Scoreboard extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    getHeadings = (name)=>{
        return(
            <View style = {{flexDirection:'row', flex:1}}>
                <TouchableOpacity style = {{flex:1}}>
                    <Text style = {{fontSize:25, alignSelf:'center'}}>{name}</Text>
                </TouchableOpacity>
                {/* <View style = {{height:'100%', width:2, backgroundColor:'black'}}></View> */}
            </View>
        )
    }
    getList = ()=>{
        return(
            <View>
                <FlatList 
                        
                        data = {{}} 

                        renderItem = {(item)=>{
                            return(
                                <View style = {{flex:1}}>
                                    
                                </View>
                            )
                        }}

                        onEndReached={() => {
                            console.log(" ***************** "+distanceFromEnd);
                            // get more data
                            
                          }}
                />
            </View>
        )
    }
    render(){
        return(
            <View style = {{flex:1, backgroundColor:'gray'}}>
                {/* heading */}
                <View style = {{flexDirection:'row'}}>
                    {this.getHeadings("Name")}
                    {this.getHeadings("Score")}
                    {this.getHeadings("Date & Time")}
                </View>

                {/* hr */}
                <View style = {{height:2, width:'100%', backgroundColor:'black'}}></View>

                {/* FlatList */}
                {this.getList()}
            </View>
        )
    }
}