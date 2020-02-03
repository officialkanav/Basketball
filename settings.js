import React from 'react';
import {
    View,
    Picker,
    Slider,
    TouchableOpacity,
    TextInput,
    Text,
  } from 'react-native';

export default class Home extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            color:"green",
            ballRadius:5,
            speed:3,
            basketRadius:5
        }
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor:'gray'}}>
                {/* reset */}
                <View style = {{flexDirection:'row-reverse'}}>
                    <TouchableOpacity style = {{backgroundColor:'gray'}}>
                        <Text style = {{fontSize:25, color:'black'}}>Reset</Text>
                    </TouchableOpacity>
                </View>

                {/* color */}
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
                        <Picker.Item label="blue" value="steelblue" />
                    </Picker>
                </View>

                {/* ballRadius */}
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

                {/* speed */}
                <View style = {{flexDirection:'row', marginTop:80}}>
                    <Text style = {{fontSize:20}}>Speed: </Text>
                    <TouchableOpacity style = {{marginLeft:110}} onPress = {()=>{this.setState({speed:this.state.speed-1})}}>
                        <Text style = {{fontSize:40}}> -  </Text>
                    </TouchableOpacity>
                    <Text style = {{fontSize:40}}>{this.state.speed}</Text>
                    <TouchableOpacity onPress = {()=>{this.setState({speed:this.state.speed+1})}}>
                        <Text style = {{fontSize:40}}> +  </Text>
                    </TouchableOpacity>
                </View>

                {/* basketRadius */}
                <View style = {{flexDirection:'row', marginTop:80}}>
                    <Text style = {{fontSize:20}}>basketRadius: </Text>
                    <Slider
                        step={0.1}
                        minimumValue={1}
                        maximumValue={10}
                        minimumTrackTintColor="#307ecc"
                        maximumTrackTintColor="#000000"
                        onValueChange={(value)=>{this.setState({basketRadius:Math.floor(value)})}}
                        value={this.state.basketRadius}
                        style = {{flex:1}}
                        />
                    <Text style = {{fontSize:30}}>{this.state.basketRadius}</Text>
                </View>

                {/* save */}
                <View style = {{alignSelf:'center', marginTop:100}}>
                    <TouchableOpacity style = {{backgroundColor:'silver'}}>
                        <Text style = {{fontSize:35, color:'black'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}