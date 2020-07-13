import { combineReducers } from 'redux'
import thReducer from './ThReducer'
import AuReducer from './AuReducer'
import AlReducer  from './AlReducer'

export default combineReducers( { thought: thReducer, auth: AuReducer, alert: AlReducer } )