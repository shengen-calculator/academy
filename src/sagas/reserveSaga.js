import {call, put} from "redux-saga/effects";
import * as types from "../redux/actions/actionTypes";
import ReserveApi from "../api/reserve";

export function* addReserve(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const table = yield call(ReserveApi.addReserve, action.params);
        yield put({type: types.ADD_RESERVE_SUCCESS, params: action.params, table});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.ADD_RESERVE_FAILURE, text: e.message});
    }
}

export function* getReserves(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        let table = [];
        if(action.date) {
            table = yield call(ReserveApi.getReserves, action.params);
        } else if(action.isFuture) {
            table = yield call(ReserveApi.getFutureReserves, action.params);
        } else {
            table = yield call(ReserveApi.getPastReserves, action.params);
        }
        yield put({type: types.GET_RESERVES_SUCCESS, params: action.params, table});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_RESERVES_FAILURE, text: e.message});
    }
}
