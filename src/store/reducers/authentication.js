import * as actionTypes from '../actions'

const initialState = {
    isAuthenticated: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOG_IN:
            return {
                ...state,
                isAuthenticated: action.payload != null
            }
        case actionTypes.LOG_OUT:
            return {
                ...state,
                isAuthenticated: action.payload != null
            }
        default:
            return state
    }
}

export default reducer