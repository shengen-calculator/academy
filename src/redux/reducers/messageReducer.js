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



        default:
            return state;
    }
}