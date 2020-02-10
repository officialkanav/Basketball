import React from 'react';
import {
    View,
    Image,
    Animated,
    Text,
    TouchableOpacity,
    LayoutAnimation,UIManager,
    Dimensions,
    BackHandler,
    PanResponder,
    ImageBackground
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
            timer: 30,
            score: 0,
            animator: new Animated.Value(0),
            panX: new Animated.Value(middle),
            animationTweek: 1,
            currentX: middle,
            modalVisible: false,
            prevX: -1000,
            zIndex:-1
        }

        this.threshold = 50
        this.backCount = 0

        this.panHandler = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            
            onPanResponderGrant(e, gestureState){
                
            },
            onPanResponderMove: 
                Animated.event([null, {moveX: this.state.panX}])
            ,
        
            onPanResponderRelease: (evt, gestureState) => {
                if(gestureState.moveX<4)
                    this.state.panX.setValue(4)
                if(gestureState.moveX>Dimensions.get('window').width/1.2)
                    this.state.panX.setValue(Dimensions.get('window').width/1.2)
                this.setState({currentX:gestureState.moveX})
            },
            
          })
    }

    componentDidMount(){
        this.startTimer()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = ()=>{
        if(this.backCount == 0){
            alert("Press back again to exit game")
            this.backCount = 1
            return true;
        }
        return false
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

    calculateBallRadius = ()=>{
        initradius = this.props.ballRadius
        radius = this.state.animator.interpolate({
            inputRange: [0,1.3,2],
            outputRange: [20 * initradius,10*initradius,13*initradius]
        })
        return(radius)
    }

    calculateBasketRadius = ()=>{
        return(30 * this.props.basketRadius)
    }

    result = ()=>{
        value = Math.abs(this.state.currentX - middle)
        value = value * this.props.ballSpeed
        value = value / this.props.basketRadius
        if(value<this.threshold){
            this.setState({animationTweek:1})
            return 'won'
        }
        this.setState({animationTweek:1.5})
        return 'lost'
    }

    getBall = ()=>{
        const top = this.state.animator.interpolate({
            inputRange: [0,this.state.animationTweek,2],
            outputRange: [600,130,400]
        })
        return(
                <Animated.View {...this.panHandler.panHandlers} style = {{backgroundColor:this.props.ballColor
                , borderRadius:10*this.props.ballRadius, 
                height:this.calculateBallRadius(), width:this.calculateBallRadius(), 
                position:'absolute',left:this.state.panX, top,
                }}/>   
        )
    }

    getTimerAndScore = ()=>{
        return(
                <View style = {{flexDirection:'row'}}>
                    <Text style = {{fontSize:35, merginLeft:10}}>{this.state.timer}</Text>
                    <Text style = {{fontSize:25, position:'absolute', left:310}}>Score: {this.state.score}</Text>
                </View>
        )
    }

    getShootButton = ()=>{
        return(
            <TouchableOpacity style = {{alignSelf:'center', alignItems:'center', backgroundColor:'black', height:50, width:100, borderRadius:15, position:'absolute', top:720, left:Dimensions.get('window').width/2.5}}
                disabled = {this.state.prevX == this.state.currentX?true:false}
                onPress = {()=>{this.shoot()}}>
                <Text style = {{fontSize:35, color:'white'}}>Shoot</Text>
            </TouchableOpacity>
        )
    }

    startWinAnimation = ()=>{
        const interpolationFactor = this.interpolateSpeed()

        Animated.timing(this.state.panX,{
            toValue: middle, 
            duration:1000*interpolationFactor
        }).start()

        Animated.timing(this.state.animator, {
            toValue: 1.5,
            duration: 1000*interpolationFactor
            }).start()

        setTimeout(()=>{this.setState({zIndex:1})},800*interpolationFactor)

        setTimeout(()=>{
            Animated.spring(this.state.animator, {
            toValue: 2,
            duration: 2000*interpolationFactor,
            damping:5
            }).start()},1000*interpolationFactor)

        setTimeout(()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({animator: new Animated.Value(0), currentX:middle},()=>{this.setState({score:this.state.score+1, zIndex:-1})})    
        }
        ,2000*interpolationFactor)
    }

    startLosingAnimation = ()=>{
        let direction = null

        if(this.state.currentX<165)
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
            this.setState({animator: new Animated.Value(0), currentX:direction})
            }
        ,2000*this.interpolateSpeed())
    }

    shoot = ()=>{
        this.setState({prevX:this.state.currentX})
        if(this.result() == 'won')
            this.startWinAnimation()
        else
            this.startLosingAnimation()
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor:'#EE891D'}}>
                {/* Modal */}
                <CustomModal modalVisible = {this.state.modalVisible} score = {this.state.score} />
               
                {/* timer and score */}
                {this.getTimerAndScore()}
                
                {/* basket */}
                <ImageBackground style = {{zIndex:-1, alignSelf:'center', height:200,width:300, marginTop:50}} source = {require('./court.jpg')}/>
                <View style = {{zIndex:-1, height:130, width:30, alignSelf:'center', backgroundColor:'black'}}/>
                <View style = {{backgroundColor:'brown', zIndex:this.state.zIndex, alignSelf:'center', position:'absolute',top:270,borderRadius:10, height:10,width:this.calculateBasketRadius(), marginTop:0}}></View>
                
                {/* ball */}
                {this.getBall()}
                
                {/* button */}
                {this.getShootButton()}

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