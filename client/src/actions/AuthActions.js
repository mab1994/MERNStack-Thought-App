import { REGISTER_SUCC, REGISTER_FAIL, CLEAR_ERROR, LOAD_USER, AUTH_ERROR, LOGIN_SUCC, LOGIN_FAIL, EXIT_USER } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

// ---Load User---
export const loadUser = () => dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    axios.get('/api/auth')
        .then(res => dispatch({
            type: LOAD_USER,
            payload: res.data
        }))
        .catch(() => dispatch({
            type: AUTH_ERROR,
        }))

}

// ---Register---
export const register = formData => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('/api/user', formData, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCC,
                payload: res.data
            })
            dispatch(loadUser())
        })
        .catch(err => dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        }))
}

// ---Clear Errors---
export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR
    })

}

// ---Login User---
export const login = formData => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.post('/api/auth', formData, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCC,
                payload: res.data
            })
            dispatch(loadUser())
        })
        .catch(err => dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        }))
}

// ---Exit User---
export const logout = () => dispatch => {
    dispatch({
        type: EXIT_USER
    })
}