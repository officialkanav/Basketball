import {combineReducers} from 'redux'
import saveSettingsReducer from './saveSettingsReducer'
import scoreReducer from './scoreReducer'

export default combineReducers({saveSettingsReducer,scoreReducer})