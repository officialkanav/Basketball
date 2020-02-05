import React from 'react';
import {
    View,
    Image,
    Animated,
    Text,
    TouchableOpacity,
    LayoutAnimation,UIManager,
    Dimensions,
    PanResponder
} from 'react-native'
import { connect } from 'react-redux';

class Play extends React.PureComponent{
    constructor(props){

        super(props)

        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
        
        this.state = {
            timer: 60,
            score: 0,
            animator: new Animated.Value(0),
            panX: new Animated.Value(Dimensions.get('window').width/2.2)
        }

        this.panHandler = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            
            onPanResponderGrant(e, gestureState){
                
            },
            onPanResponderMove: 
                // (e, gestureState)=>{Animated.event([null, {gestureState.dx: this.state.panX}])}
                Animated.event([null, {moveX: this.state.panX}])
            ,
        
            onPanResponderRelease: (evt, gestureState) => {
            //   alert(gestureState.moveX)
                if(gestureState.moveX<4)
                    this.state.panX.setValue(4)
                if(gestureState.moveX>Dimensions.get('window').width/1.2)
                    this.state.panX.setValue(Dimensions.get('window').width/1.2)
            },
            
          })
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
    
    interpolateSpeed = ()=>{
        if(this.props.ballSpeed<=3)
            return (4-this.props.ballSpeed);
        return 0.75
    }

    startAnimation = ()=>{
        Animated.timing(this.state.panX,{
            toValue: Dimensions.get('window').width/2.2, 
            duration:1000*this.interpolateSpeed()
        }).start()
        Animated.timing(this.state.animator, {
            toValue: 1.5,
            duration: 1000*this.interpolateSpeed()
            }).start()
        setTimeout(()=>{
            Animated.spring(this.state.animator, {
            toValue: 2,
            duration: 2000*this.interpolateSpeed(),
            damping:5
            }).start()},1000*this.interpolateSpeed())
        setTimeout(()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({animator: new Animated.Value(0)})
            }
        ,2000*this.interpolateSpeed())
    }

    shoot = ()=>{
        this.startAnimation()
    }

    getBall = ()=>{
        const top = this.state.animator.interpolate({
            inputRange: [0,1,2],
            outputRange: [600,130,400]
        })
        return(
            <Animated.View {...this.panHandler.panHandlers} style = {{backgroundColor:this.props.ballColor, borderRadius:10*this.props.ballRadius, height:this.calculateBallRadius(), width:this.calculateBallRadius(), position:'absolute',left:this.state.panX, top}}/>        
        )
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
                <Image style = {{marginLeft:20, alignSelf:'center', height:350,width:this.calculateBasketRadius(), marginTop:50}} source = {{uri:'https://cdn.clipart.email/367e47979d6a07e53dd467da14c64888_basketball-ring-with-stand-clipart-clipartxtras_331-550.jpeg'}}></Image>
                {/* ball */}
                {this.getBall()}
                {/* button */}
                <TouchableOpacity style = {{alignSelf:'center', alignItems:'center', backgroundColor:'black', height:50, width:100, borderRadius:15, position:'absolute', top:720, left:Dimensions.get('window').width/2.5}}
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