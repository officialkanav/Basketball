import React from 'react';
import {
    View,
    Picker,
    Slider,
    TouchableOpacity,
    Text,
  } from 'react-native';
import { connect } from 'react-redux';
import {initialSettings} from './reducers/SaveSettingsReducer'
import { Dropdown } from 'react-native-material-dropdown';

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

    saveSettings = ()=>{
        newSettings = {
            ballColor: this.state.color,
            ballSpeed: this.state.speed,
            ballRadius: this.state.ballRadius,
            basketRadius: this.state.basketRadius,
        }
        action = {type: 'saveSettings', payLoad: newSettings}
        this.props.dispatch(action)
        this.props.navigation.navigate('Dashboard') 
    }

    resetSettings = ()=>{
        let restoredSettings = {
            color: initialSettings.ballColor,
            speed: initialSettings.ballSpeed,
            ballRadius: initialSettings.ballRadius,
            basketRadius: initialSettings.basketRadius,
        }
        this.setState({...restoredSettings})
        let action = {type: 'resetSettings'}
        this.props.dispatch(action)
        this.props.navigation.navigate('Dashboard')
    }

    getResetButton = ()=>{
        return(
            <View style = {{flexDirection:'row-reverse'}}>
                <TouchableOpacity style = {{backgroundColor:'gray'}}
                    onPress = {this.resetSettings}>
                    <Text style = {{fontSize:25, color:'black'}}>Reset</Text>
                </TouchableOpacity>
            </View>
        )
    }

    setBallColor = ()=>{
        let data = [{value: 'red'},{value: 'green'},{value: 'blue'},
                    {value: 'orange'},{value: 'black'},{value: 'yellow'}];
      
        return(
            <View style = {{marginTop:50}}>
                <Dropdown
                    label='Ball Color'
                    itemCount = {3}
                    data={data}
                    value = {this.state.color==null?this.props.ballColor:this.state.color}
                    onChangeText = {(value)=>{this.setState({color:value})}}
                />
            </View>
        )
    }

    setBallRadius = ()=>{
        return(
            <View style = {{marginTop:85,flexDirection:'row'}}>
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
            <View style = {{flexDirection:'row', marginTop:85}}>
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
            <View style = {{flexDirection:'row', marginTop:85}}>
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
                    onPress = {this.saveSettings}>
                    <Text style = {{fontSize:35, color:'black'}}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }


    render(){
        return(
            <View style = {{flex:1, backgroundColor:'#EE891D'}}>
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
        ...state.SaveSettingsReducer
    }
}

export default connect(mapStateToProps)(Settings)