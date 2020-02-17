import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput,
    AppState
} from 'react-native'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import fetchDate from './utils/FetchDateObject'

class CustomModal extends React.PureComponent{
    constructor(props){
        super(props)
        
        this.state = {
            name:'',
            disableSubmit:false
        }
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.modalVisible == false && this.props.modalVisible == true){
            this.getDate()
        }
    }

    async getDate(){
        this.object = await fetchDate(this.props.score)
        this.props.dispatch({type:'tempStore',payLoad:this.object})
    }

    submitOnPress = ()=>{
        if(this.state.name.length == 0){
            alert("Name please")
        }
        else{
            this.setState({disableSubmit:true})
            this.object.name = this.state.name
            this.props.dispatch({type:'saveScore',payLoad:this.object})
            this.props.dispatch({type: 'clearTempStore'})
            this.props.navigation.navigate('Dashboard')
        }
    }

    submitAndReplayOnPress = ()=>{
        if(this.state.name.length == 0){
            alert("Name please")
        }
        else{
            this.setState({disableSubmit:true})
            this.object.name = this.state.name
            this.props.dispatch({type:'saveScore',payLoad:this.object})
            this.props.dispatch({type: 'clearTempStore'})
            setTimeout(()=>{this.props.navigation.navigate('Play')},10)
            this.props.navigation.navigate('Dashboard')
        }
    }

    getHeading = ()=>{
        return(
            <View style = {{alignItems:'center',marginTop:100}}>
                <Text style = {{fontSize:40}}>Game Over!</Text>
            </View>
        )
    }

    getPlaceholder = ()=>{
        return(
            <View style = {{ marginTop:100, alignItems:'center'}}>
                <TextInput
                    style={{ 
                        borderRadius:10, fontSize:35, height: 70, width: 280, borderColor: 'black',
                        borderWidth: 1 
                    }}
                    placeholder = "Enter Name"
                    onChangeText={text => {text.length<=18?this.setState({name:text}):null}}
                    value={this.state.name}
                    />
            </View>
        )
    }
    
    getScore = ()=>{
        return(
            <View style = {{alignItems:'center',marginTop:100}}>
                <Text style = {{fontSize:40}}>Your Score Is: {this.props.score}</Text>
            </View>
        )
    }

    getSubmitButton = ()=>{
        return(
            <View>
                <View style = {{alignItems:'center',marginTop:100}}>
                    <TouchableOpacity style = {{backgroundColor:'black', borderRadius:10}}
                        onPress = {this.submitOnPress}
                        disabled = {this.state.disableSubmit}
                        >
                        <Text style = {{color:'white', fontSize:40}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{alignItems:'center',marginTop:100}}>
                    <TouchableOpacity style = {{backgroundColor:'black', borderRadius:10}}
                        onPress = {this.submitAndReplayOnPress}
                        disabled = {this.state.disableSubmit}
                        >
                        <Text style = {{color:'white', fontSize:40}}>{'Submit&Replay'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){

        return(
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    alert('Press Submit')
                }}
                presentationStyle='overFullScreen'
                >

                <View style = {{backgroundColor:'#EE891D', flex:1}}>

                    {this.getHeading()}

                    {this.getPlaceholder()}

                    {this.getScore()}

                    {this.getSubmitButton()}
                </View>

            </Modal>
        )
    }
}

export default connect()(withNavigation(CustomModal))