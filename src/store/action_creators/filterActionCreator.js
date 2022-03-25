import * as actionTypes from "../actions/filterActionTypes"

export const toggleHouse = (value) => {
    return {
        type: actionTypes.SET_HAS_HOUSE_FILTER,
        payload: value
    }
}

export const toggleYard = (value) => {
    return {
        type: actionTypes.SET_HAS_FENCED_YARD_FILTER,
        payload: value
    }
}

export const toggleDog = (value) => {
    return {
        type: actionTypes.SET_DOESNT_OWN_DOG_FILTER,
        payload: value
    }
}

export const toggleCat = (value) => {
    return {
        type: actionTypes.SET_DOESNT_OWN_CAT_FILTER,
        payload: value
    }
}

export const toggleBoard = (value) => {
    return {
        type: actionTypes.SET_BOARDING_FILTER,
        payload: value
    }
}

export const toggleSitting = (value) => {
    return {
        type: actionTypes.SET_HOUSE_SITTING_FILTER,
        payload: value
    }
}

export const toggleVisits = (value) => {
    return {
        type: actionTypes.SET_DROP_IN_VISITS_FILTER,
        payload: value
    }
}

export const toggleDayCare = (value) => {
    return {
        type: actionTypes.SET_DAY_CARE_FILTER,
        payload: value
    }
}

export const toggleWalking = (value) => {
    return {
        type: actionTypes.SET_DOG_WALKING_FILTER,
        payload: value
    }
}

export const toggleService = (value) => {
    return {
        type: actionTypes.SET_SERVICE_FILTER,
        payload: value
    }
}