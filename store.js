import { createStore } from 'redux';
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// read combineEpics 
const persistConfig = {
    key: 'rootReducer',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2 
   }

// const pReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(pReducer);

// export default persistStore(store);
export default store = createStore(rootReducer)