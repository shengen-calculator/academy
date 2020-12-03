import {call, put} from "redux-saga/effects";
import * as types from "../redux/actions/actionTypes";
import TableApi from "../api/table";

export function* getTableCollection(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const tables = yield call(TableApi.getTables, action.params.uid);
        yield put({type: types.GET_TABLES_SUCCESS, tables});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_TABLES_FAILURE, text: e.message});
    }
}