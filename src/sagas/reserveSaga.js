import {call, put} from "redux-saga/effects";
import * as types from "../redux/actions/actionTypes";
import ReserveApi from "../api/reserve";

export function* addReserve(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const reserve = yield call(ReserveApi.addReserve, action.params);
        yield put({type: types.ADD_RESERVE_SUCCESS, reserve});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.ADD_RESERVE_FAILURE, text: e.message});
    }
}

export function* saveReserve(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const reserve = yield call(ReserveApi.saveReserve, action.params);
        yield put({type: types.UPDATE_RESERVE_SUCCESS, reserve});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.UPDATE_RESERVE_FAILURE, text: e.message});
    }
}

export function* deleteReserve(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        yield call(ReserveApi.deleteReserve, action.params);
        yield put({type: types.DELETE_RESERVE_SUCCESS, params: action.params});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.DELETE_RESERVE_FAILURE, text: e.message});
    }
}

export function* getReserves(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const reserves = yield call(ReserveApi.getReserves, action.params);
        yield put({type: types.GET_RESERVES_SUCCESS, reserves});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_RESERVES_FAILURE, text: e.message});
    }
}

export function* getFutureReserves(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const reserves = yield call(ReserveApi.getFutureReserves, action.params);
        yield put({type: types.GET_FUTURE_RESERVES_SUCCESS, params: action.params, reserves});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_FUTURE_RESERVES_FAILURE, text: e.message});
    }
}

export function* getPastReserves(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const reserves = yield call(ReserveApi.getPastReserves, action.params);
        yield put({type: types.GET_PAST_RESERVES_SUCCESS, params: action.params, reserves});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.GET_PAST_RESERVES_FAILURE, text: e.message});
    }
}
