import React from 'react';
import {View,Image} from 'react-native'
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux'
import {store} from './store/Store'
import persist from './store/Store'
import { PersistGate } from 'redux-persist/lib/integration/react';

export default App = () => {
  console.disableYellowBox = true;
  return (
    // <Provider store = {persist}>
    <Provider store = {store}> 
      <PersistGate loading={null} persistor={persist}>
        <AppNavigator></AppNavigator>
      </PersistGate>
    </Provider>  
  );
};

