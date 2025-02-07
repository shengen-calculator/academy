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

        case types.ADD_TABLE_SUCCESS:
            return {
                ...state,
                text: `Information about table successfully saved`,
                type: 'success',
            };

        case types.DELETE_TABLE_SUCCESS:
            return {
                ...state,
                text: `Table was successfully deleted`,
                type: 'success',
            };

        case types.UPDATE_TABLE_SUCCESS:
            return {
                ...state,
                text: `Information about table successfully saved`,
                type: 'success',
            };

        case types.ADD_RESERVE_SUCCESS:
            return {
                ...state,
                text: `Information about your reservation successfully saved`,
                type: 'success',
            };

        case types.UPDATE_RESERVE_SUCCESS:
            return {
                ...state,
                text: `Information about your reservation successfully updated`,
                type: 'success',
            };

        case types.DELETE_RESERVE_SUCCESS:
            return {
                ...state,
                text: `Reservation successfully deleted`,
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

        case types.GET_TABLES_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.ADD_TABLE_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.UPDATE_TABLE_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.DELETE_TABLE_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.SWAP_TABLES_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.ADD_RESERVE_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.GET_FUTURE_RESERVES_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.GET_PAST_RESERVES_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.GET_RESERVES_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.UPDATE_RESERVE_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        case types.DELETE_RESERVE_FAILURE:
            return {
                ...state,
                type: 'error',
                text: action.text
            };

        default:
            return state;
    }
}