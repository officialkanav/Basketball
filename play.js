import React from 'react';
import {
    View,
    Animated,
    Text,
    TouchableOpacity,
    LayoutAnimation,UIManager,
    Dimensions,
    BackHandler,
    PanResponder,
    ImageBackground,
    Platform,
    ToastAndroid,
    Image
} from 'react-native'
import {
    interpolateRightBoundary,
    interpolateSpeed,
    interpolateBallRadius,
    calculateBasketRadius,
    calculateBasketHeight,
    calculateMiddle,
    result} from './utils/Calculators'
import { connect } from 'react-redux';
import CustomModal from './Modal'

const middle = calculateMiddle(Dimensions.get('window').width)

class Play extends React.PureComponent{
    constructor(props){
        super(props)

        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
        
        this.state = {
            timer:this.props.timer,
            score: 0,
            animator: new Animated.Value(0),
            panX: new Animated.Value(middle),
            animationTweek: 1,
            currentX: middle,
            modalVisible: false,
            prevX: -1000,
            zIndex:0,
            enablePanResponder: true
        }

        this.threshold = 50
        this.backCount = 0

        this.panHandler = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => this.state.enablePanResponder,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => this.state.enablePanResponder,
            onMoveShouldSetPanResponder: (evt, gestureState) => this.state.enablePanResponder,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.state.enablePanResponder,
            onPanResponderMove: (evt, gestureState) =>{
                const rightBoundaryLimit = interpolateRightBoundary(this.props.ballRadius) * middle

                if(gestureState.moveX<rightBoundaryLimit)
                    this.state.panX.setValue(gestureState.moveX)
                else
                    this.state.panX.setValue(rightBoundaryLimit)
            },
            onPanResponderRelease: (evt, gestureState) => {
                const rightBoundaryLimit = interpolateRightBoundary(this.props.ballRadius) * middle
                if(gestureState.moveX<rightBoundaryLimit)
                    this.setState({currentX:gestureState.moveX})
                else
                    this.setState({currentX:rightBoundaryLimit})
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
            if (Platform.OS === 'android'){
                ToastAndroid.show('Press again to exit game', ToastAndroid.SHORT)
            } 
            else{
                alert('Press again to exit game');
            }
            this.backCount = 1
            setTimeout(()=>{this.backCount = 0},2000)
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

    calculateBallRadius = ()=>{
        initradius = interpolateBallRadius(this.props.ballRadius)
        radius = this.state.animator.interpolate({
            inputRange: [0,1.3,2],
            outputRange: [20 * initradius,10*initradius,13*initradius]
        })
        return(radius)
    }

    getBall = ()=>{
        const top = this.state.animator.interpolate({
            inputRange: [0,this.state.animationTweek,2],
            outputRange: [600,80,500]
        })
        return(
                <Animated.View {...this.panHandler.panHandlers} 
                    style = {{
                        backgroundColor:this.props.ballColor,borderRadius:10*(interpolateBallRadius(this.props.ballRadius)), 
                        height:this.calculateBallRadius(), width:this.calculateBallRadius(), 
                        position:'absolute',left:this.state.panX, top
                    }}/>   
        )
    }

    getTimerAndScore = ()=>{
        return(
                <View style = {{flexDirection:'row'}}>
                    <Text style = {{fontSize:35, merginLeft:10}}>{this.state.timer}</Text>
                    <Text style = {{fontSize:25, position:'absolute', left:310}}>
                        Score: {this.state.score}
                    </Text>
                </View>
        )
    }

    getBasketRing = ()=>{
        return(
            <View style = {{position:'absolute', top:260, alignSelf:'center',zIndex:this.state.zIndex}}>
                <Image style = {{
                    borderRadius:10, height:calculateBasketHeight(this.props.basketRadius),width:calculateBasketRadius(this.props.basketRadius),
                    marginRight:80
                    }} source = {require('./assets/net.png')}>
                </Image>
            </View>
        )
    }

    getShootButton = ()=>{
        return(
            <TouchableOpacity 
                style = {{
                    alignSelf:'center', alignItems:'center', backgroundColor:'black', 
                    height:50, width:100, borderRadius:15, position:'absolute', top:720, 
                    left:Dimensions.get('window').width/2.5
                }}
                onPress = {()=>{
                        if(Math.abs(this.state.prevX-this.state.currentX)<10){
                            if (Platform.OS === 'android'){
                                ToastAndroid.show('Cannot shoot from same place', ToastAndroid.SHORT)
                            } 
                            else{
                                alert('Cannot shoot from same place');
                            }
                        }
                        else
                            this.shoot()
                    }}>
                <Text style = {{fontSize:35, color:'white'}}>Shoot</Text>
            </TouchableOpacity>
        )
    }

    startWinAnimation = ()=>{
        const interpolationFactor = interpolateSpeed(this.props.ballSpeed)

        Animated.parallel([
            Animated.timing(this.state.panX,{
                toValue: middle, 
                duration:1000*interpolationFactor
            }),
            Animated.timing(this.state.animator, {
                toValue: 1.5,
                duration: 1000*interpolationFactor
            })
        ])
        .start()

        setTimeout(()=>{this.setState({zIndex:1})},600*interpolationFactor)

        setTimeout(()=>{
            Animated.spring(this.state.animator, {
            toValue: 2,
            damping:5
            }).start()},1000*interpolationFactor)

        setTimeout(()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({animator: new Animated.Value(0), enablePanResponder:true, panX: new Animated.Value(this.state.currentX)},
            ()=>{this.state.timer>0?this.setState({score:this.state.score+1, zIndex:0}):this.setState({zIndex:0})})    
        }
        ,2000*interpolationFactor)
    }

    startLosingAnimation = ()=>{
        let direction = null
        const interpolationFactor = interpolateSpeed(this.props.ballSpeed)

        if(this.state.currentX<180)
            direction = 120
        else    
            direction = 250

        Animated.parallel([
            Animated.timing(this.state.panX,{
                toValue: direction, 
                duration:1000*interpolationFactor
            }),
            Animated.timing(this.state.animator, {
                toValue: 1.5,
                duration: 1000*interpolationFactor
            })
        ]).start()

        setTimeout(()=>{
            Animated.spring(this.state.animator, {
            toValue: 2,
            damping:5
            }).start()},1000*interpolationFactor)

        setTimeout(()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({animator: new Animated.Value(0), enablePanResponder:true, panX: new Animated.Value(this.state.currentX)})
            }
        ,2000*interpolationFactor)
    }

    shoot = ()=>{
        this.setState({prevX:this.state.currentX, enablePanResponder:false})
        if(result(this.state.currentX, 180, this.props.ballSpeed, this.props.basketRadius, this.threshold) == 'won'){
            this.setState({animationTweek:1},this.startWinAnimation)
            
        }
        else{
            this.setState({animationTweek:1.5},this.startLosingAnimation)
        }      
    }
    
    render(){
        return(
            <ImageBackground source = {require('./assets/backgroundPlay.jpg')} style = {{height:900, width:500}}>
                {/* Modal */}
                <CustomModal modalVisible = {this.state.modalVisible} score = {this.state.score} />
               
                {/* timer and score */}
                {this.getTimerAndScore()}
                
                {/* basket and floor */}
                <Image style = {{ alignSelf:'center', height:170,width:250, marginTop:70, marginRight:80}} source = {require('./assets/court.jpg')}/>
                <View style = {{height:220, width:20, alignSelf:'center', backgroundColor:'gray', marginRight:80}}/>
                {this.getBasketRing()}
                <View style = {{backgroundColor:'black', height:2, width:450}}></View>
               
                {/* ball */}
                {this.getBall()}
                
                {/* button */}
                {this.getShootButton()}
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.SaveSettingsReducer
    }
}

export default higherOrderFirst = connect(mapStateToProps)(Play)