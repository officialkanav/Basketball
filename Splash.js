import React from 'react';
import {
    View,
    Image,
} from 'react-native'
import { withNavigation } from 'react-navigation';

export default class Splash extends React.PureComponent{
    constructor(props){
        super(props)
        
        this.state = {
        }
        setTimeout(()=>{this.props.navigation.navigate('Dashboard')},1000)
    }
     
    render(){
        return(
            <View style = {{flex:1, justifyContent:'center', backgroundColor:'black'}}>
                <Image source = {{uri:'https://cdn7.dissolve.com/p/D2012_42_055/D2012_42_055_1200.jpg'}} style = {{flex:1,height:300,width:500,alignSelf:'center'}}>
                </Image>
                </View>
        )
    }
}