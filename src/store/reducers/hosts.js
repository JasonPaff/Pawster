import * as actionTypes from '../actions/actionTypes'

const initialState = {
    hosts: [],
    filteredHosts:[]
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
                filteredHosts: action.payload
            }
        default:
            return state;
    }
}

export default hostReducer