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

