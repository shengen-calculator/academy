import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function reservationReducer(state = initialState.reserves, action) {
    switch (action.type) {
        case types.ADD_RESERVE_REQUEST:
            return state;
        default:
            return state;
    }
}