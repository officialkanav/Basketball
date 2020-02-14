import {combineReducers} from 'redux'
import SaveSettingsReducer from './SaveSettingsReducer'
import ScoreReducer from './ScoreReducer'
import TempStateReducer from './TempStateReducer'

export default combineReducers({SaveSettingsReducer,ScoreReducer,TempStateReducer})