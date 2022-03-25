import * as actionTypes from '../actions/photoActionTypes'

export const setPhoto = (photo) => {
    return {
        type: actionTypes.SET_PHOTO,
        payload: photo,
    }
}

export const removePhoto = (photo) => {
    return {
        type: actionTypes.REMOVE_PHOTO,
        payload: photo
    }
}