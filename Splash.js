import React from 'react';
import {
    View,
    Image,
} from 'react-native'
import { connect } from 'react-redux';

class Splash extends React.PureComponent{
    constructor(props){
        super(props)
        
        if(this.props.unsavedScore!=null){
            this.props.dispatch({type:'saveScore',payLoad:this.props.unsavedScore})
            this.props.dispatch({type: 'clearTempStore'})
        }
        setTimeout(()=>{this.props.navigation.navigate('Dashboard')},1000)
    }

    render(){
        return(
            <View style = {{flex:1, justifyContent:'center', backgroundColor:'black'}}>
                <Image source = {require('./assets/splash.jpg')} 
                    style = {{flex:1,height:300,width:500,alignSelf:'center'}}/>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        ...state.TempStateReducer
    }
}

export default connect(mapStateToProps)(Splash)