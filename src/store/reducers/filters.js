import * as actionTypes from '../actions/filterActionTypes'

const initialState = {
    doesBoarding: false,
    doesHouseSitting: false,
    doesDropInVisits: false,
    doesDayCare: false,
    doesDogWalking: false,
    canHostMultiplePets: false,
    canHostUnspayedFemales: false,
    hasChildren: false,
    hasOtherPets: false,
    isHomeFullTime: false,
    isSmoking: false,
    sizeCanHost: "All" ,
    canHostSmallPet: false,
    canHostMediumPet: false,
    canHostLargePet: false,
    canHostGiantPet: false,
    doesCat:false,
    doesDog:false,   
}

const filterReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CAN_HOST_MULTI_PETS:
                return {
                    ...state,
                    canHostMultiplePets: action.payload
                }
            case actionTypes.SET_CAN_HOST_UPSPAYED:
                return {
                    ...state,
                    canHostUnspayedFemales: action.payload
                }
            case actionTypes.SET_HAS_CHILDREN:
                return {
                    ...state,
                    hasChildren: action.payload
                }
            case actionTypes.SET_HAS_OTHER_PETS:
                return {
                    ...state,
                    hasOtherPets: action.payload
                }
            case actionTypes.SET_IS_HOME_FULL_TIME:
                return {
                    ...state,
                    isHomeFullTime: action.payload
                }
            case actionTypes.SET_IS_SMOKING:
                return {
                    ...state,
                    isSmoking: action.payload
                }
            case actionTypes.SET_SMALL:
                return {
                    ...state,
                    canHostSmallPet: action.payload
                }
            case actionTypes.SET_MEDIUM:
                return {
                    ...state,
                    canHostMediumPet: action.payload
                }
            case actionTypes.SET_LARGE:
                return {
                    ...state,
                    canHostLargePet: action.payload
                }
            case actionTypes.SET_GIANT:
                return {
                    ...state,
                    canHostGiantPet: action.payload
                }
            case actionTypes.SET_DOG:
                return {
                    ...state,
                    doesDog: action.payload
                }
            case actionTypes.SET_CAT:
                return {
                    ...state,
                    doesCat: action.payload
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
            case actionTypes.SET_SIZE_FILTER:
                return {
                    ...state,
                    canHostSmallPet: false,
                    canHostMediumPet : false,
                    canHostLargePet: false,
                    canHostGiantPet: false,
                    ...action.payload
                }
             
        default:
            return state;
    }
}

export default filterReducer