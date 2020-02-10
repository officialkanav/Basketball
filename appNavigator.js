import Home from './home';
import Settings from './settings';
import Scoreboard from './scoreboard'
import Play from './play'
import Splash from './Splash'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default AppNavigator = createAppContainer(createStackNavigator({
    Home: {
      screen: Splash,
      navigationOptions:{
        header: null,
      }
    },
    Dashboard: {
      screen: Home,
      navigationOptions:{
        headerLeft: null,
        headerTitleStyle : {color:'gray'}
      }
    },
    Setting: {
      screen: Settings,
      navigationOptions:{
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle : {color:'gray'},
        title: "Settings",
        headerTintColor: 'gray',
        headerLeft: null,
      },
    },
    Scoreboard: {
      screen: Scoreboard,
      navigationOptions:{
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle : {color:'gray'},
        headerTintColor: 'gray',
      }
    },
    Play: {
      screen: Play,
      navigationOptions:{
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle : {color:'gray'},
        headerTintColor: 'gray',
        headerLeft: null,
      }
    },

  }))
  
  