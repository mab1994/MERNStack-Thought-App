import { REGISTER_SUCC, REGISTER_FAIL, CLEAR_ERROR, LOAD_USER, AUTH_ERROR, LOGIN_SUCC, LOGIN_FAIL, EXIT_USER } from '../actions/types'

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    error: null
}

const AuReducer = ( state = initState, action ) => {
    switch ( action.type ) {
        case LOGIN_SUCC:
        case REGISTER_SUCC:
            localStorage.setItem( 'token', action.payload.token ) 
            return {
                ...state, ...action.payload, isAuthenticated: true
            }
        case AUTH_ERROR:
        case EXIT_USER:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state, token: null, isAuthenticated: false, user: null, error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state, error: null
            }
        case LOAD_USER:
            return {
                ...state, isAuthenticated: true, user: action.payload
            }
        default:
            return state
    }
}

export default AuReducer