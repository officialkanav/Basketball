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

class CustomModal extends React.PureComponent{
    constructor(props){
        super(props)
        
        this.state = {
            name:'',
        }
        this.getDate()
    }
    
    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }
     
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    
    handleAppStateChange = (nextAppState) => {
        if (this.props.modalVisible && (nextAppState === 'inactive' || nextAppState === 'background')) {
            this.object.score = this.props.score
            this.props.dispatch({type:'saveScore',payLoad:this.object})
            this.props.navigation.navigate('Dashboard')
        }    
    }

    fetchDate = ()=>{
        return fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
            .then((response) => response.json())
            .then((responseJson) => {
                
                dateAndTime = responseJson.datetime.split('T')
                date = dateAndTime[0].split('-')
                date = date[2]+'-'+date[1]+'-'+date[0]
                dateTime = date + "/" + dateAndTime[1].slice(0,8)

                dateObject = {
                    name: '',
                    score: -1,
                    unixTime: responseJson.unixtime,
                    dateAndTime: dateTime,
                }

                // this.props.dispatch({type:'saveScore',payLoad:dateObject})
                return dateObject;
            })
            .catch((error) => {
            console.error(error);
            });
    }

    async getDate(){
        this.object = await this.fetchDate()
    }

    submitOnPress = ()=>{
        if(this.state.name.length == 0){
            alert("Name please")
        }
        else{
            this.object.name = this.state.name
            this.object.score = this.props.score

            this.props.dispatch({type:'saveScore',payLoad:this.object})
            this.props.navigation.navigate('Dashboard')
        }
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
            <View style = {{alignItems:'center',marginTop:100}}>
                <TouchableOpacity style = {{backgroundColor:'black', borderRadius:10}}
                    onPress = {this.submitOnPress}>
                    <Text style = {{color:'white', fontSize:40}}>Submit</Text>
                </TouchableOpacity>
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

                    <View style = {{alignItems:'center',marginTop:100}}>
                        <Text style = {{fontSize:40}}>Game Over!</Text>
                    </View>

                    {this.getPlaceholder()}

                    {this.getScore()}

                    {this.getSubmitButton()}

                </View>

            </Modal>
        )
    }
}

export default connect()(withNavigation(CustomModal))