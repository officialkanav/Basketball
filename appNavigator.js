import Home from './home';
import Settings from './settings';
import Scoreboard from './scoreboard'
import Play from './play'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default AppNavigator = createAppContainer(createStackNavigator({
    Home: {
      screen: Home
    },
    Setting: {
      screen: Settings,
      navigationOptions:{
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle : {color:'gray'},
        title: "Settings"
      },
    },
    Scoreboard: {
      screen: Scoreboard,
      navigationOptions:{
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle : {color:'gray'},
      }
    },
    Play: {
      screen: Play,
      navigationOptions:{
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle : {color:'gray'},
      }
    }
  }))
  
  