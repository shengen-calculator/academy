import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function reservationReducer(state = initialState.reserves, action) {
    switch (action.type) {
        case types.ADD_RESERVE_REQUEST:
            return state;
        case types.GET_PAST_RESERVES_SUCCESS:
            return {
                ...state, past: action.reserves
            };
        case types.GET_FUTURE_RESERVES_SUCCESS:
            return {
                ...state, future: action.reserves
            };
        case types.GET_RESERVES_SUCCESS:
            return state;
        default:
            return state;
    }
}