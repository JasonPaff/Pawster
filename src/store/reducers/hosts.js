import * as actionTypes from '../actions/actionTypes'

const initialState = {
    hosts: []
}

const hostReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOSTS:
            return {
                ...state,
                hosts: action.payload
            }
        default:
            return state;
    }
}

export default hostReducer