import * as actionTypes from '../actions/filterActionTypes'

const initialState = {
    hosts: [
        {
            "name":"John",
            "has_house": true,
            "has_fenced_yard": true,
            "doesnt_own_dog": false,
            "doesnt_own_cat": false,
            "doesBoarding": true,
            "doesHouseSitting": false,
            "doesDropInVisits": true,
            "doesDayCare": false,
            "doesDogWalking": false,

        },
        {
            "name": "Mary",
            "has_house": true,
            "has_fenced_yard": false,
            "doesnt_own_dog": true,
            "doesnt_own_cat": false,
            "doesBoarding": true,
            "doesHouseSitting": true,
            "doesDropInVisits": true,
            "doesDayCare": false,
            "doesDogWalking": true,

        },
        {
            "name": "Steven",
            "has_house": false,
            "has_fenced_yard": false,
            "doesnt_own_dog": true,
            "doesnt_own_cat": true,
            "doesBoarding": false,
            "doesHouseSitting": false,
            "doesDropInVisits": true,
            "doesDayCare": true,
            "doesDogWalking": false,
        },
        {
            "name": "Greg",
            "has_house": true,
            "has_fenced_yard": true,
            "doesnt_own_dog": false,
            "doesnt_own_cat": false,
            "doesBoarding": true,
            "doesHouseSitting": false,
            "doesDropInVisits": true,
            "doesDayCare": false,
            "doesDogWalking": false,
        },
        {
            "name": "Tom",
            "has_house": true,
            "has_fenced_yard": false,
            "doesnt_own_dog": true,
            "doesnt_own_cat": false,
            "doesBoarding": false,
            "doesHouseSitting": false,
            "doesDropInVisits": false,
            "doesDayCare": true,
            "doesDogWalking": true,
        },
        
    ]
}

const hostReducer = (state=initialState, action) => {
    return state;
}

export default hostReducer