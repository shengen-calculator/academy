import {call, put} from "redux-saga/effects";
import * as types from "../redux/actions/actionTypes";
import UserApi from "../api/user";

export function* updateUserDetails(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        yield call(UserApi.saveUserDetails, action.params.uid, action.params.data);
        yield put({type: types.REGISTRATION_SUCCESS, params: action.params});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.REGISTRATION_FAILURE, text: e.message});
    }
}