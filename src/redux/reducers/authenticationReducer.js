import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authenticationReducer(state = initialState.authentication, action) {
    switch (action.type) {
        case types.REGISTRATION_SUCCESS:
            return {
                ...state,
                name: action.params.name,
                userId: action.params.uid
            };

        case types.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                name: action.params.name,
                userId: action.params.uid,
                restaurant: action.params.restaurant
            };

        case types.USER_UPDATE_SUCCESS:
            return {
                ...state,
                restaurant: action.params.restaurant
            };

        case types.LOG_OUT_SUCCESS:
            return {
                ...state,
                name: '',
                restaurant: '',
                userId: ''
            };
        default:
            return state;
    }
}