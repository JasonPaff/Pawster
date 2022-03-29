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


export const getHosts = (hosts) => {
    return {
        type: actionTypes.SET_HOSTS,
        payload: hosts
    }
}


export const getFilteredHosts = (filteredHosts) => {
    return {
        type: actionTypes.SET_FILTERED_HOSTS,
        payload: filteredHosts
    }
}