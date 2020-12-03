import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tableReducer(state = initialState.tables, action) {
    switch (action.type) {
        case types.GET_TABLES_SUCCESS:
            return action.tables;

        case types.ADD_TABLE_SUCCESS:
            return [
                ...state, action.table
            ];
        case types.UPDATE_TABLE_SUCCESS:
            return [
                ...state.filter(x => x.id !== action.table.id), action.table
            ];
        default:
            return state;
    }
}