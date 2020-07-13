import { ADD_THOUGHT, DELETE_THOUGHT, STORE_THOUGHT, MODIFY_THOUGHT, CLEAR_THOUGHT, THOUGHT_ERROR, GET_THOUGHT, GET_THOUGHT_CONNECTED, REMOVE_CURRENT, SWITCH_VOTES } from './types'
import axios from 'axios'

// ---Add Thought To DB---
export const addThought = newPost => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post('/api/thought', newPost, config)
        .then(res => dispatch({
            type: ADD_THOUGHT,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: THOUGHT_ERROR,
            payload: err.response.msg
        }))
}

// ---Receive Thoughts From DB---
// ---Receive Recent Thoughts from DB---
export const getThought = () => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.get('/api/thought/recent', config)
        .then(res => dispatch({
            type: GET_THOUGHT,
            payload: res.data
        }))
        // .catch(err => dispatch({
        //     type: THOUGHT_ERROR,
        //     payload: err.response.data.msg
        // })) 
}

export const getThoughtConnected = () => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.get('/api/thought/recentConnected', config)
        .then(res => dispatch({
            type: GET_THOUGHT_CONNECTED,
            payload: res.data
        }))
        // .catch(err => dispatch({
        //     type: THOUGHT_ERROR,
        //     payload: err.response.data.msg
        // }))
    }

// ---Remove Thought From DB---
export const deleteThought = id => dispatch => {
    axios.delete(`/api/thought/${id}`)
         .then( () => dispatch({
            type: DELETE_THOUGHT,
            payload: id
        }) )
         .catch(err => dispatch({
            type: THOUGHT_ERROR,
            payload: err.response.data.msg
        }))
    
}

// ---Remove Current---
export const removeCurrent = () => dispatch => {
    dispatch({
        type: REMOVE_CURRENT
    })
}

// ---Modify Thought In DB---
export const storeThought = thought => dispatch => {
    dispatch({
        type: STORE_THOUGHT,
        payload: thought
    })
}

export const modifyThought = (id, modifiedThought) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    axios.put(`/api/thought/${id}`, modifiedThought, config)
         .then( res => dispatch({
            type: MODIFY_THOUGHT,
            payload: modifiedThought
        }) )
        .catch(err => dispatch({
            type: THOUGHT_ERROR,
            payload: err.response.msg
        }))
    
}

export const clearThought = () => dispatch => {
    dispatch({
        type: CLEAR_THOUGHT,
    })
}


// ---Insert Vote---
export const insertVote = id => async dispatch => {
    try {
        const res = await axios.put(`/api/thought/vote/${id}`);
        dispatch({
            type: SWITCH_VOTES,
            payload: { id, votes: res.data }
        })
    } catch (err) {
        dispatch({
            type: THOUGHT_ERROR,
            payload: err.response.message
        })
    }
}

// ---Extract Vote---
export const extractVote = id => async dispatch => {
    try {
        const res = await axios.put(`/api/thought/unvote/${id}`);
        dispatch({
            type: SWITCH_VOTES,
            payload: { id, votes: res.data }
        })
    } catch (err) {
        dispatch({
            type: THOUGHT_ERROR,
            payload: err.response.message
        })
    }
}