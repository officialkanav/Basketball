import React from 'react';
import {View} from 'react-native'
import AppNavigator from './appNavigator';
import { Provider } from 'react-redux'
import {store} from './store'
import persist from './store'
import { PersistGate } from 'redux-persist/lib/integration/react';

export default App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store = {persist}>
    {/* <Provider store = {store}> */}
      {/* <PersistGate loading={<View />} persistor={persist}> */}
        <AppNavigator></AppNavigator>
      {/* </PersistGate> */}
    </Provider>  
  );
};

