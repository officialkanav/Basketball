import React from 'react';
import {
    View,
    TextInput,
    Button
} from 'react-native'
import { connect } from 'react-redux';

class savePopUp extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            text: ''
        }
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor:'gray', alignItems:'center'}}>
                <TextInput
                    style={{ color:'white',marginTop:50,fontSize:40, height: 50, width: 300, borderColor: 'white', borderWidth: 3}}
                    onChangeText={newText => {this.setState({text: newText})}}
                    value={this.state.text}
                    />
                <Button title = "Save" onPress = {()=>{
                    newObject = {name:this.state.text, score:100, dateAndTime: '345346346',unixTime:'345346457'}
                    action = {type:'saveScore', payLoad: newObject}
                    this.props.dispatch(action)
                }}></Button>
            </View>
        )
    }
}

export default higherOrderFirst = connect()(savePopUp)