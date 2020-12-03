import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tableReducer(state = initialState.tables, action) {
    switch (action.type) {
        case types.GET_TABLES_SUCCESS:
            return action.tables;

        case types.ADD_TABLE_SUCCESS:
            return {
                ...state
            };
        default:
            return state;
    }
}