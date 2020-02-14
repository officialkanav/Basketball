import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    BackHandler,
    ToastAndroid,
    Platform,
    AlertIOS,
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
                headerLeft:null,
                headerStyle : {
                    backgroundColor:'black',
                },
                
                headerRight : ()=>(
                        <View style = {{flex:1}}>
                            <TouchableHighlight onPress = {()=>{
                                BackHandler.removeEventListener('hardwareBackPress', navigation.state.params.handleBackButtonClick);
                                navigation.navigate('Setting')}
                            }>
                                <Image source = {require('./assets/settings.jpg')}
                                        style = {{height:30, width: 30, marginTop: 10}}/>
                            </TouchableHighlight>
                        </View>
                )
        }
        )
    }
    
    componentDidMount(){
        this.props.navigation.setParams({handleBackButtonClick: this.handleBackButtonClick})
    
        didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.backCounter = 0
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
            }
        )
    }

    handleBackButtonClick = ()=>{
        if(this.backCounter == 0){

            if (Platform.OS === 'android'){
                ToastAndroid.show('Press again to exit app', ToastAndroid.SHORT)
            } 
            else{
                AlertIOS.alert('Press again to exit app');
            }
            this.backCounter = 1
            setTimeout(()=>{this.backCounter = 0},2000)
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
                <Image source = {require('./assets/home.jpg')} 
                    style = {{height:500, width: 500, alignSelf:'center'}}/>
                <View style = {{ flexDirection:'row'}}>
                    <View style = {{marginTop:100, marginRight:20}}>{this.getButton("Play")}</View>
                    <View style = {{marginTop:100, marginLeft:20}}>{this.getButton("Scoreboard")}</View>
                </View>
            </View>
            
        )
    }
}