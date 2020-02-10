import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    BackHandler
  } from 'react-native';

export default class Home extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {

        }
        this.backCounter = 0
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
                            <TouchableHighlight onPress = {()=>{
                                this.backCounter = 1;
                                navigation.push('Setting',{
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
    
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
              this.backCounter = 0
            }
        )
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        // didBlurSubscription.removeEventListener()
    }

    handleBackButtonClick = ()=>{
        console.log("Hi, counter:"+this.backCounter)
        if(this.backCounter == 0){
            alert("Press again to exit!")
            this.backCounter = 1
            return true;
        }

        return false
    }

    getButton = (text)=>{
        return(
            <TouchableOpacity style = {{borderRadius:30,width:350,backgroundColor:'black', 
                alignItems:'center', justifyContent:'center'}} onPress = {()=>{this.backCounter = 1; this.props.navigation.push(text)}}>

                <Text style = {{color:'white',fontSize:40,fontWeight:'500', height:75, 
                    width:250,textAlign:'center'}}>{text}</Text>     
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor:'orange', alignItems:'center'}}>
                <View style = {{marginTop:250}}>{this.getButton("Play")}</View>
                <View style = {{marginTop:100}}>{this.getButton("Scoreboard")}</View>
            </View>
        )
    }
}