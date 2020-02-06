import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

class CustomModal extends React.PureComponent{
    constructor(props){
        super(props)
        
        this.state = {
            name:'',
        }
    }

    fetchDate = ()=>{
        fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
            .then((response) => response.json())
            .then((responseJson) => {
                
                dateAndTime = responseJson.datetime.split('T')
                dateTime = dateAndTime[0] + " / " + dateAndTime[1].slice(0,5)

                dateObject = {
                    name: this.state.name,
                    score: this.props.score,
                    unixTime: responseJson.unixtime,
                    dateAndTime: dateTime,
                }

                this.props.dispatch({type:'saveScore',payLoad:dateObject})
                return dateObject;
            })
            .catch((error) => {
            console.error(error);
            });
            }

    submitOnPress = (navigation)=>{
        
        if(this.state.name.length == 0){
            alert("Name please")
        }
        else{
            // fetching date
            this.fetchDate()
            this.props.navigation.navigate('Home')
        }
    }

    render(){
        return(
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                }}
                presentationStyle='overFullScreen'
                >

                <View style = {{backgroundColor:'white', flex:1}}>
                    <View style = {{alignItems:'center',marginTop:100}}>
                        <Text style = {{fontSize:40}}>Game Over!</Text>
                    </View>
                    <View style = {{ marginTop:100, alignItems:'center'}}>
                        <TextInput
                            style={{ borderRadius:10, fontSize:35, height: 70, width: 280, borderColor: 'black', borderWidth: 1 }}
                            placeholder = "Enter Name"
                            onChangeText={text => {text.length<=18?this.setState({name:text}):null}}
                            value={this.state.name}
                            />
                    </View>
                    <View style = {{alignItems:'center',marginTop:100}}>
                        <Text style = {{fontSize:40}}>Your Score Is: {this.props.score}</Text>
                    </View>
                    <View style = {{alignItems:'center',marginTop:100}}>
                        <TouchableOpacity style = {{backgroundColor:'black', borderRadius:10}}
                            onPress = {this.submitOnPress}>
                            <Text style = {{color:'white', fontSize:40}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }
}

export default connect()(withNavigation(CustomModal))