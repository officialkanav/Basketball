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

let self = () => {}
  
export default class Home extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {

        }
        this.backCounter = 0
        self = this.handleBackButtonClick
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
                                BackHandler.removeEventListener('hardwareBackPress', self);
                                console.log('here')
                                this.backCounter = 2
                                navigation.push('Setting')}}>
                                <Image source = {{uri:'https://static.vecteezy.com/system/resources/previews/000/331/341/large_2x/vector-setting-icon.jpg'}}
                                        style = {{height:30, width: 30, marginTop: 10}}/>
                            </TouchableHighlight>
                        </View>
                )
        }
        )
    }
    
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        self = this.handleBackButtonClick
        didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                self = this.handleBackButtonClick
                this.backCounter = 0
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
            }
        )
    }

    componentWillUnmount() {
        // didBlurSubscription.removeEventListener()
    }

    handleBackButtonClick = ()=>{
        if(this.backCounter == 2){
            return true
        }
        if(this.backCounter == 0){
            alert("Press again to exit!")
            this.backCounter = 1
            return true;
        }
        BackHandler.exitApp()
        return false
    }

    getButton = (text)=>{
        return(
            <TouchableOpacity style = {{borderRadius:30,width:150,height:50,backgroundColor:'black', 
                alignItems:'center', justifyContent:'center'}} 
                onPress = {()=>{BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick); this.props.navigation.push(text)}}>
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