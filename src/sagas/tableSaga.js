import {call, put} from "redux-saga/effects";
import * as types from "../redux/actions/actionTypes";
import TableApi from "../api/table";

export function* getTableCollection(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const tables = yield call(TableApi.getTables, action.params);
        yield put({type: types.GET_TABLES_SUCCESS, tables});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_TABLES_FAILURE, text: e.message});
    }
}

export function* addTable(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const table = yield call(TableApi.addTable, action.params);
        yield put({type: types.ADD_TABLE_SUCCESS, params: action.params, table});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.ADD_TABLE_FAILURE, text: e.message});
    }
}

export function* updateTable(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        yield call(TableApi.updateTable, action.params);
        yield put({type: types.UPDATE_TABLE_SUCCESS, params: action.params});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.UPDATE_TABLE_FAILURE, text: e.message});
    }
}

export function* deleteTable(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        yield call(TableApi.deleteTable, action.params);
        yield put({type: types.DELETE_TABLE_SUCCESS, params: action.params});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.DELETE_TABLE_FAILURE, text: e.message});
    }
}


export function* swapTables(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});

        yield call(TableApi.updateTable, action.params.source);
        yield call(TableApi.updateTable, action.params.dest);
        yield put({type: types.SWAP_TABLES_SUCCESS});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.SWAP_TABLES_FAILURE, text: e.message});
    }
}