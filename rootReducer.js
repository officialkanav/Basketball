import {combineReducers} from 'redux'
import saveSettingsReducer from './saveSettingsReducer'
import scoreReducer from './scoreReducer'
import tempStateReducer from './tempStateReducer'

export default combineReducers({saveSettingsReducer,scoreReducer,tempStateReducer})