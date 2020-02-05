import React from 'react';
import {
    View,
    TextInput,
    Button
} from 'react-native'
import { connect } from 'react-redux';

class Play extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <View>
                
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default higherOrderFirst = connect()(Play)