import React from 'react';
import {
    View,
    Image,
    Animated,
    Text,
    TouchableOpacity,
    LayoutAnimation,UIManager
} from 'react-native'
import { connect } from 'react-redux';

class Play extends React.PureComponent{
    constructor(props){
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
        super(props)
        this.state = {
            timer: 60,
            score: 0,
            animator: new Animated.Value(0)
        }
    }
    componentDidMount(){
        this.startTimer()
        // didBlurSubscription = this.props.navigation.addListener(
        //     'willFocus',
        //     payload => {
              
        //     }
        // )
    }

    // componentWillUnmount(){
    //     didBlurSubscription.remove();
    // }

    startTimer = ()=>{
        let cd = setInterval(()=>{
            if(this.state.timer == 0){
                clearInterval(cd)
            }
            else{
                this.setState({timer: this.state.timer-1})
            }
        },1000)
    }

    getBall = ()=>{
        const top = this.state.animator.interpolate({
            inputRange: [0,1,2],
            outputRange: [600,130,400]
        })
        return(
            <Animated.View style = {{backgroundColor:this.props.ballColor, borderRadius:10*this.props.ballRadius, height:this.calculateBallRadius(), width:this.calculateBallRadius(), position:'absolute',left:'45%', top}}/>        
        )
    }

    startAnimation = ()=>{
        Animated.timing(this.state.animator, {
            toValue: 1.5,
            duration: 1000
            }).start()
        setTimeout(()=>{
            Animated.spring(this.state.animator, {
            toValue: 2,
            duration: 2000,
            damping:5
            }).start()},1000)
        setTimeout(()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({animator: new Animated.Value(0)})
            }
        ,3000)
    }
    shoot = ()=>{
        this.startAnimation()
    }
    calculateBallRadius = ()=>{
        initradius = this.props.ballRadius
        const radius = this.state.animator.interpolate({
            inputRange: [0,1,2],
            outputRange: [20 * initradius,15*initradius,18*initradius]
        })
        return(radius)
    }
    calculateBasketRadius = ()=>{
        return(60 * this.props.basketRadius)
    }
    calculateThreshold = ()=>{

    }
    render(){
        return(
            <View style = {{flex:1, backgroundColor:'white'}}>
                {/* timer and score */}
                <View style = {{flexDirection:'row'}}>
                    <Text style = {{fontSize:35, merginLeft:10}}>{this.state.timer}</Text>
                    <Text style = {{fontSize:25, position:'absolute', left:310}}>Score: {this.state.score}</Text>
                </View>
                {/* basket */}
                <Image style = {{alignSelf:'center', height:350,width:this.calculateBasketRadius(), marginTop:50}} source = {{uri:'https://cdn.clipart.email/367e47979d6a07e53dd467da14c64888_basketball-ring-with-stand-clipart-clipartxtras_331-550.jpeg'}}></Image>
                {/* ball */}
                {this.getBall()}
                {/* button */}
                <TouchableOpacity style = {{alignSelf:'center',justifyContent:'center', alignItems:'center', backgroundColor:'black', height:50, width:100, borderRadius:15, position:'absolute', top:720}}
                    onPress = {()=>{this.shoot()}}>
                    <Text style = {{fontSize:35, color:'white'}}>Shoot</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.saveSettingsReducer
    }
}

export default higherOrderFirst = connect(mapStateToProps)(Play)