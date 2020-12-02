import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function messageReducer(state = initialState.message, action) {
    switch (action.type) {

        case types.REGISTRATION_SUCCESS:
            return {
                ...state,
                type: 'success',
                text: 'Congratulation. Your account successfully created.'
            };

        case types.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                text: `Welcome ${action.params.name}`,
                type: 'success',
            };

        case types.USER_UPDATE_SUCCESS:
            return {
                ...state,
                text: `Restaurant name is ${action.params.restaurant}`,
                type: 'success',
            };

        case types.LOG_OUT_SUCCESS:
            return {
                ...state,
                type: 'success',
                text: 'Good byes.'
            };

        case types.REGISTRATION_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.AUTHENTICATION_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.USER_UPDATE_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        default:
            return state;
    }
}