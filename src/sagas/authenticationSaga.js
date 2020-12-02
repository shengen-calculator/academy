import {call, put} from 'redux-saga/effects';
import * as types from '../redux/actions/actionTypes';
import AuthenticationApi from '../api/authentication';
import UserApi from "../api/user";

export function* logIn(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const { user } = yield call(AuthenticationApi.logIn, action.params);
        const details = yield call(UserApi.getUserDetails, user.uid);
        if(details) {
            yield put({type: types.AUTHENTICATION_SUCCESS, params: {...details, uid: user.uid}});
        } else {
            yield put({type: types.API_CALL_ERROR});
            yield put({type: types.AUTHENTICATION_FAILURE, text: 'Can not find user details'});
        }
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.AUTHENTICATION_FAILURE, text: e.message});
    }
}

export function* logOut() {
    try {
        yield put({type: types.BEGIN_API_CALL});
        yield call(AuthenticationApi.logOut);
        yield put({type: types.LOG_OUT_SUCCESS});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.LOG_OUT_FAILURE, message: e.message});
    }
}


export function* register(action) {
    try {
        yield put({type: types.BEGIN_API_CALL});
        const { user } = yield call(AuthenticationApi.register, action.params);
        yield call(UserApi.saveUserDetails, user.uid, action.details);
        yield put({type: types.REGISTRATION_SUCCESS, params: {...action.details, uid: user.uid}});
    } catch (e) {
        yield put({type: types.API_CALL_ERROR});
        yield put({type: types.REGISTRATION_FAILURE, text: e.message});
    }
}