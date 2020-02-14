import Home from './Home';
import Settings from './Settings';
import Scoreboard from './Scoreboard'
import Play from './Play'
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
  
  