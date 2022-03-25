import * as actionTypes from '../actions/filterActionTypes'

const initialState = {
    doesBoarding: false,
    doesHouseSitting: false,
    doesDropInVisits: false,
    doesDayCare: false,
    doesDogWalking: false,
    has_house: false,
    has_fenced_yard: false,
    doesnt_own_dog: false,
    doesnt_own_cat: false,    
}

const filterReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HAS_HOUSE_FILTER:
                return {
                    ...state,
                    has_house: action.payload
                }
            case actionTypes.SET_HAS_FENCED_YARD_FILTER:
                return {
                    ...state,
                    has_fenced_yard: action.payload
                }
            case actionTypes.SET_DOESNT_OWN_DOG_FILTER:
                return {
                    ...state,
                    doesnt_own_dog: action.payload
                }
            case actionTypes.SET_DOESNT_OWN_CAT_FILTER:
                return {
                    ...state,
                    doesnt_own_cat: action.payload
                }
            case actionTypes.SET_SERVICE_FILTER:
                return {
                    ...state,
                    doesBoarding: false,
                    doesHouseSitting : false,
                    doesDropInVisits: false,
                    doesDayCare: false,
                    doesDogWalking: false,
                    ...action.payload
                }
             
        default:
            return state;
    }
}

export default filterReducer