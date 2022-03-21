import * as actionTypes from '../actions/actionTypes'

export const login = (token) => {
    return {
        type: actionTypes.LOG_IN,
        payload: token
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOG_OUT,
        payload: null
    }
}