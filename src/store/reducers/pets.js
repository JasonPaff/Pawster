import * as actionTypes from '../actions/photoActionTypes'

const initialState = {
    photo: []
}

const petReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PHOTO:
            return {
                ...state,
                photo: action.payload
            }
        case actionTypes.REMOVE_PHOTO:
            const photos = state.photo.filter((shot) => {
                return shot.name !== action.payload;
            });
            return {
                ...state,
                photo: photos
            }
        default:
            return state;
    }
}

export default petReducer