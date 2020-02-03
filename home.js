import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
  } from 'react-native';

export default class Home extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    static navigationOptions = ({navigation})=>{
        return(
            {
                title: "Home",
                headerTitleStyle : {
                    color:'gray',
                },
                headerStyle : {
                    backgroundColor:'black',
                },
                
                headerRight : ()=>(
                        <View style = {{flex:1}}>
                            <TouchableHighlight onPress = {()=>{navigation.push('Setting',{
                                cBack: ()=>{ self.timerCallback() } 
                            })}}>
                                <Image source = {{uri:'https://static.vecteezy.com/system/resources/previews/000/331/341/large_2x/vector-setting-icon.jpg'}}
                                style = {{height:30, width: 30, marginTop: 10}}></Image>
                            </TouchableHighlight>
                        </View>
                )
        }
        )
    }
    
    getButton = (text)=>{
        return(
            <TouchableOpacity style = {{borderRadius:30,width:350,backgroundColor:'black', 
                alignItems:'center', justifyContent:'center'}} onPress = {()=>{this.props.navigation.push(text)}}>

                <Text style = {{color:'white',fontSize:40,fontWeight:'500', height:75, 
                    width:200,textAlign:'center'}}>{text}</Text>
                    
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor:'gray', alignItems:'center'}}>
                <View style = {{marginTop:250}}>{this.getButton("Play")}</View>
                <View style = {{marginTop:100}}>{this.getButton("Scoreboard")}</View>
            </View>
        )
    }
}