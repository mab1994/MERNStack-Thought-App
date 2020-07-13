import { ADD_THOUGHT, DELETE_THOUGHT, MODIFY_THOUGHT, STORE_THOUGHT, THOUGHT_ERROR, GET_THOUGHT, CLEAR_THOUGHT, REMOVE_CURRENT, GET_THOUGHT_CONNECTED, SWITCH_VOTES } from '../actions/types'


const init = {

    thought: [],
    saved: null,
    liked: null,
    error: null
}

const thReducer = (state = init, action) => {
    switch (action.type) {
        case ADD_THOUGHT:
            return { ...state, thought: [...state.thought, action.payload] }
        case GET_THOUGHT_CONNECTED:
        case GET_THOUGHT:
            return { ...state, thought: action.payload }
        case THOUGHT_ERROR:
            return { ...state, error: action.payload }
        case REMOVE_CURRENT:
            return { ...state, thought: [] }
        case DELETE_THOUGHT:
            return { ...state, thought: state.thought.filter(el => el._id !== action.payload) }
        case STORE_THOUGHT:
            return { ...state, saved: action.payload }
        // case PUT_LIKER:
        case MODIFY_THOUGHT:
            return { ...state, thought: state.thought.map(el => el._id === action.payload._id ? action.payload : el) }
        case CLEAR_THOUGHT:
            return { ...state, saved: null }
        case SWITCH_VOTES:
            return { ...state, thought: state.thought.map(el => el._id === action.payload._id ? { ...el, votes: action.payload.votes } : el) }
        default:
            return state
    }
}

export default thReducer 