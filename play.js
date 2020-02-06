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
import CustomModal from './Modal'

const middle = Dimensions.get('window').width/2.2
class Play extends React.PureComponent{
    constructor(props){
        super(props)

        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
        
        this.state = {
            timer: 5,
            score: 0,
            animator: new Animated.Value(0),
            panX: new Animated.Value(middle),
            animationTweek: 1,
            modalVisible: false,
        }

        this.threshold = 50
        this.currentX = middle
        
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
                if(gestureState.moveX<4)
                    this.state.panX.setValue(4)
                if(gestureState.moveX>Dimensions.get('window').width/1.2)
                    this.state.panX.setValue(Dimensions.get('window').width/1.2)
                this.currentX = gestureState.moveX
                console.log(this.currentX)
            },
            
          })
    }

    componentDidMount(){
        this.startTimer()
    }


    startTimer = ()=>{
        let cd = setInterval(()=>{
            if(this.state.timer == 0){
                clearInterval(cd)
                this.setState({modalVisible:true})
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

    startWinAnimation = ()=>{
        Animated.timing(this.state.panX,{
            toValue: middle, 
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
            this.setState({animator: new Animated.Value(0)},()=>{this.setState({score:this.state.score+1})})
            }
        ,2000*this.interpolateSpeed())
    }

    startLosingAnimation = ()=>{
        let direction = null
        if(this.currentX<165)
            direction = 100
        else    
            direction = 250   
        Animated.timing(this.state.panX,{
            toValue: direction, 
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
        if(this.result() == 'won')
            this.startWinAnimation()
        else
            this.startLosingAnimation()
        this.currentX = 165
    }

    getBall = ()=>{
        const top = this.state.animator.interpolate({
            inputRange: [0,this.state.animationTweek,2],
            outputRange: [600,130,400]
        })
        return(
            <Animated.View {...this.panHandler.panHandlers} style = {{backgroundColor:this.props.ballColor, borderRadius:10*this.props.ballRadius, height:this.calculateBallRadius(), width:this.calculateBallRadius(), position:'absolute',left:this.state.panX, top}}/>        
        )
    }

    calculateBallRadius = ()=>{
        initradius = this.props.ballRadius
        radius = this.state.animator.interpolate({
            inputRange: [0,1,2],
            outputRange: [20 * initradius,12*initradius,15*initradius]
        })
        return(radius)
    }

    calculateBasketRadius = ()=>{
        return(60 * this.props.basketRadius)
    }

    result = ()=>{
        value = Math.abs(this.currentX - 165)
        value = value * this.props.ballSpeed
        value = value / this.props.basketRadius
        if(value<this.threshold){
            this.setState({animationTweek:1})
            return 'won'
        }
        this.setState({animationTweek:1.5})
        return 'lost'
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor:'white'}}>
                <CustomModal modalVisible = {this.state.modalVisible} score = {this.state.score} />
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