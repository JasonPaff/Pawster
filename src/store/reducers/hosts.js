import * as actionTypes from '../actions/filterActionTypes'

const initialState = {
    hosts: [
        {
            "name":"John",
            "has_house": true,
            "has_fenced_yard": true,
            "doesnt_own_dog": false,
            "doesnt_own_cat": false
        },
        {
            "name": "Mary",
            "has_house": true,
            "has_fenced_yard": false,
            "doesnt_own_dog": true,
            "doesnt_own_cat": false
        },
        {
            "name": "Steven",
            "has_house": false,
            "has_fenced_yard": false,
            "doesnt_own_dog": true,
            "doesnt_own_cat": true
        },
        
    ]
}

const hostReducer = (state=initialState, action) => {
    return state
}

export default hostReducer