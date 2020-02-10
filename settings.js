import React from 'react';
import {
    View,
    Picker,
    Slider,
    TouchableOpacity,
    TextInput,
    Text,
  } from 'react-native';
import { connect } from 'react-redux';

class Settings extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            color:null,
            ballRadius:null,
            speed:null,
            basketRadius:null,
        }
    }

    componentDidMount(){
        this.changeState()
    }

    changeState = ()=>{
        this.setState({
            color:this.props.ballColor,
            ballRadius:this.props.ballRadius,
            speed:this.props.ballSpeed,
            basketRadius:this.props.basketRadius,
        })
    }

    getResetButton = ()=>{
        return(
            <View style = {{flexDirection:'row-reverse'}}>
                <TouchableOpacity style = {{backgroundColor:'gray'}}
                    onPress = {()=>{
                        let restoredSettings = {
                            color: 'red',
                            speed: 2,
                            ballRadius: 3,
                            basketRadius: 3,
                        }
                        this.setState({...restoredSettings})
                    }}>
                    <Text style = {{fontSize:25, color:'black'}}>Reset</Text>
                </TouchableOpacity>
            </View>
        )
    }

    setBallColor = ()=>{
        return(
            <View style = {{marginTop:65, flexDirection:'row'}}>
                <Text style = {{marginTop:10,fontSize:20}}>ballColor: </Text>
                <Picker
                    selectedValue={this.state.color}
                    style={{flex:1}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({color: itemValue})
                    }
                    mode = 'dropdown'>
                    <Picker.Item label="black" value="black" />
                    <Picker.Item label="green" value="green" />
                    <Picker.Item label="blue" value="blue" />
                    <Picker.Item label="red" value="red" />
                    <Picker.Item label="brown" value="brown" />
                </Picker>
            </View>
        )
    }

    setBallRadius = ()=>{
        return(
            <View style = {{marginTop:65,flexDirection:'row'}}>
                <Text style = {{fontSize:20}}>ballRadius: </Text>
                <Slider
                    step={0.1}
                    minimumValue={1}
                    maximumValue={5}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value)=>{
                        this.setState({ballRadius:Math.floor(value)},()=>{
                            if(this.state.ballRadius>this.state.basketRadius){
                                this.setState({basketRadius:this.state.ballRadius})
                            }
                        })}}
                    value={this.state.ballRadius}
                    style = {{flex:1, marginRight:10}}
                    />
                <Text style = {{fontSize:30}}>{this.state.ballRadius}</Text>
            </View>
        )
    }

    setBallSpeed = ()=>{
        return(
            <View style = {{flexDirection:'row', marginTop:75}}>
                <Text style = {{fontSize:20}}>Speed: </Text>
                <TouchableOpacity style = {{marginLeft:110}} onPress = {()=>{this.setState({speed:(this.state.speed-1)>0?this.state.speed-1:1})}}>
                    <Text style = {{fontSize:40}}> -  </Text>
                </TouchableOpacity>
                <Text style = {{fontSize:40}}>{this.state.speed}</Text>
                <TouchableOpacity onPress = {()=>{this.setState({speed:(this.state.speed+1)<5?this.state.speed+1:4})}}>
                    <Text style = {{fontSize:40}}> +  </Text>
                </TouchableOpacity>
            </View>
        )
    }

    setBasketRadius = ()=>{
       return(
            <View style = {{flexDirection:'row', marginTop:80}}>
                <Text style = {{fontSize:20}}>basketRadius: </Text>
                <Slider
                    step={0.1}
                    minimumValue={1}
                    maximumValue={5}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value)=>{
                        value = Math.floor(value)
                        if(value>=this.state.ballRadius)
                            this.setState({basketRadius:value})
                        else{
                            this.setState({ballRadius:value,basketRadius:value})
                        }
                        }}
                    value={this.state.basketRadius}
                    style = {{flex:1}}
                    />
                <Text style = {{fontSize:30}}>{this.state.basketRadius}</Text>
            </View>
            )
    }

    getSaveButton = ()=>{
        return(
            <View style = {{alignSelf:'center', marginTop:100}}>
                <TouchableOpacity style = {{backgroundColor:'silver'}}
                    onPress = {()=>{
                        let newSettings = {
                            ballColor: this.state.color,
                            ballSpeed: this.state.speed,
                            ballRadius: this.state.ballRadius,
                            basketRadius: this.state.basketRadius,
                        }
                        let action = {type: 'saveSettings', payLoad: newSettings}
                        this.props.dispatch(action)
                        this.props.navigation.navigate('Dashboard')
                    }}>
                    <Text style = {{fontSize:35, color:'black'}}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }


    render(){
        return(
            <View style = {{flex:1, backgroundColor:'orange'}}>
                {/* reset */}
                {this.getResetButton()}

                {/* color */}
                {this.setBallColor()}

                {/* ballRadius */}
                {this.setBallRadius()}

                {/* speed */}
                {this.setBallSpeed()}

                {/* basketRadius */}
                {this.setBasketRadius()}

                {/* save */}
                {this.getSaveButton()}
            </View>
        )
    }
}

const mapStateToProps = state => {
    
    return {
        ...state.saveSettingsReducer
    }
}

export default connect(mapStateToProps)(Settings)