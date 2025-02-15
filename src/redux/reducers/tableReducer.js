import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tableReducer(state = initialState.tables, action) {
    switch (action.type) {
        case types.GET_TABLES_SUCCESS:
            return action.tables;

        case types.ADD_TABLE_SUCCESS:
            return [
                ...state, {...action.params.table, id: action.table.id}
            ];
        case types.UPDATE_TABLE_SUCCESS:
            const table = {...action.params.table, id: action.params.tableId};
            return [
                ...state.filter(x => x.id !== table.id), table
            ];
        case types.DELETE_TABLE_SUCCESS:
            return [
                ...state.filter(x => x.id !== action.params.tableId)
            ];
        case types.SWAP_TABLES_REQUEST:
            const source = {...action.params.source.table, id: action.params.source.tableId};
            const dest = {...action.params.dest.table, id: action.params.dest.tableId};
            let result = [...state];
            if(source.id) {
                result = [
                    ...result.filter(x => x.id !== source.id), source
                ];
            }
            if(dest.id) {
                result = [
                    ...result.filter(x => x.id !== dest.id ), dest
                ];
            }
            return result;
        default:
            return state;
    }
}