import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    BackHandler,
    ImageBackground
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
                                        style = {{height:30, width: 30, marginTop: 10}}/>
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
        if(this.backCounter == 0){
            alert("Press again to exit!")
            this.backCounter = 1
            return true;
        }

        return false
    }

    getButton = (text)=>{
        return(
            <TouchableOpacity style = {{borderRadius:30,width:150,height:50,backgroundColor:'black', 
                alignItems:'center', justifyContent:'center'}} 
                onPress = {()=>{this.backCounter = 1; this.props.navigation.push(text)}}>

                <Text style = {{color:'white',fontSize:20,fontWeight:'500',textAlign:'center'}}>
                    {text}
                </Text>     
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor:'#EE891D', alignItems:'center'}}>
                <ImageBackground source = {{uri:'https://images.assetsdelivery.com/compings_v2/lar01joka/lar01joka1506/lar01joka150600363.jpg'}} 
                    style = {{height:500, width: 500, alignSelf:'center'}}/>
                <View style = {{ flexDirection:'row'}}>
                    <View style = {{marginTop:100, marginRight:20}}>{this.getButton("Play")}</View>
                    <View style = {{marginTop:100, marginLeft:20}}>{this.getButton("Scoreboard")}</View>
                </View>
            </View>
            
        )
    }
}