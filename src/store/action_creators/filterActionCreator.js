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

export const toggleSmall = (value) => {
    return {
        type: actionTypes.SET_SMALL,
        payload: value
    }
}

export const toggleMedium = (value) => {
    return {
        type: actionTypes.SET_MEDIUM,
        payload: value
    }
}

export const toggleLarge = (value) => {
    return {
        type: actionTypes.SET_LARGE,
        payload: value
    }
}

export const toggleGiant = (value) => {
    return {
        type: actionTypes.SET_GIANT,
        payload: value
    }
}

export const toggleSize = (value) => {
    return {
        type: actionTypes.SET_SIZE_FILTER,
        payload: value
    }
}

export const toggleService = (value) => {
    return {
        type: actionTypes.SET_SERVICE_FILTER,
        payload: value
    }
}

export const toggleCat = (value) => {
    return {
        type: actionTypes.SET_DOG,
        payload: value
    }
}
export const toggleDog = (value) => {
    return {
        type: actionTypes.SET_CAT,
        payload: value
    }
}