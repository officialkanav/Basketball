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
                            ballColor: 'green',
                            ballSpeed: 3,
                            ballRadius: 5,
                            basketRadius: 5,
                        }
                        let action = {type: 'saveSettings', payLoad: restoredSettings}
                        this.props.dispatch(action)
                        setInterval(()=>{this.changeState()},100)
                        // this.setState({renderer:!this.state.renderer})
                    }}>
                    <Text style = {{fontSize:25, color:'black'}}>Reset</Text>
                </TouchableOpacity>
            </View>
        )
    }

    setBallColor = ()=>{
        return(
            <View style = {{flexDirection:'row'}}>
                <Text style = {{marginTop:100,fontSize:20}}>ballColor: </Text>
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
                </Picker>
            </View>
        )
    }

    setBallRadius = ()=>{
        return(
            <View style = {{flexDirection:'row'}}>
                <Text style = {{fontSize:20}}>ballRadius: </Text>
                <Slider
                    step={0.1}
                    minimumValue={1}
                    maximumValue={10}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value)=>{this.setState({ballRadius:Math.floor(value)})}}
                    value={this.state.ballRadius}
                    style = {{flex:1, marginRight:10}}
                    />
                <Text style = {{fontSize:30}}>{this.state.ballRadius}</Text>
            </View>
        )
    }

    setBallSpeed = ()=>{
        return(
            <View style = {{flexDirection:'row', marginTop:80}}>
                <Text style = {{fontSize:20}}>Speed: </Text>
                <TouchableOpacity style = {{marginLeft:110}} onPress = {()=>{this.setState({speed:(this.state.speed-1)>0?this.state.speed-1:1})}}>
                    <Text style = {{fontSize:40}}> -  </Text>
                </TouchableOpacity>
                <Text style = {{fontSize:40}}>{this.state.speed}</Text>
                <TouchableOpacity onPress = {()=>{this.setState({speed:(this.state.speed+1)<6?this.state.speed+1:5})}}>
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
                    minimumValue={this.state.ballRadius}
                    maximumValue={11}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    onValueChange={(value)=>{this.setState({basketRadius:Math.floor(value)})}}
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
                    }}>
                    <Text style = {{fontSize:35, color:'black'}}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }


    render(){
        return(
            <View style = {{flex:1, backgroundColor:'gray'}}>
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
        ...state.settings
    }
}

export default higherOrderFirst = connect(mapStateToProps)(Settings)