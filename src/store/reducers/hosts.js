import * as actionTypes from '../actions/actionTypes'
import * as actionTypesPhoto from '../actions/photoActionTypes'

const initialState = {
    hosts: [],
    filteredHosts:[],
    userPhoto: [],
}

const hostReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOSTS:
            return {
                ...state,
                hosts: action.payload
            }
        case actionTypes.SET_FILTERED_HOSTS:
            return {
                ...state,
                filteredHosts: action.payload
            }
        case actionTypesPhoto.SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.payload
            }
        case actionTypesPhoto.REMOVE_PHOTO:
            const photos = state.userPhoto.filter((shot) => {
                return shot.name !== action.payload;
            });
            return {
                ...state,
                userPhoto: photos
            }
        default:
            return state;
    }
}

export default hostReducer