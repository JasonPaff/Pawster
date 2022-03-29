import * as actionTypes from '../actions/actionTypes'

const initialState = {
    hosts: [],
    filtered_hosts:[]
}

const hostReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOSTS:
            return {
                ...state,
                hosts: action.payload
            }
        case actionTypes.SET_FILTERED_HOSTS:
            return {
                ...state,
                filtered_hosts: action.payload
            }
        default:
            return state;
    }
}

export default hostReducer