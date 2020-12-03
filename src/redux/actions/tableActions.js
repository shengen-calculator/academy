import * as types from './actionTypes';

export function getTablesRequest(params) {
    return { type: types.GET_TABLES_REQUEST,  params};
}

export function addTableRequest(params) {
    return { type: types.ADD_TABLE_REQUEST,  params};
}

export function updateTableRequest(params) {
    return { type: types.UPDATE_TABLE_REQUEST,  params};
}