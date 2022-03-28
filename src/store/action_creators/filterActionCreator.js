import * as actionTypes from "../actions/filterActionTypes"

export const toggleMultiPets = (value) => {
    return {
        type: actionTypes.SET_CAN_HOST_MULTI_PETS,
        payload: value
    }
}

export const toggleUnspayed = (value) => {
    return {
        type: actionTypes.SET_CAN_HOST_UPSPAYED,
        payload: value
    }
}

export const toggleChildren = (value) => {
    return {
        type: actionTypes.SET_HAS_CHILDREN,
        payload: value
    }
}

export const toggleOtherPets = (value) => {
    return {
        type: actionTypes.SET_HAS_OTHER_PETS,
        payload: value
    }
}

export const toggleHomeFull = (value) => {
    return {
        type: actionTypes.SET_IS_HOME_FULL_TIME,
        payload: value
    }
}

export const toggleSmoking = (value) => {
    return {
        type: actionTypes.SET_IS_SMOKING,
        payload: value
    }
}

export const toggleService = (value) => {
    return {
        type: actionTypes.SET_SERVICE_FILTER,
        payload: value
    }
}