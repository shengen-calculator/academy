import {takeLatest} from 'redux-saga/effects';
import * as types from '../redux/actions/actionTypes';

import {
    logIn,
    logOut,
    register
} from "./authenticationSaga";
import {
    updateUserDetails
} from "./userSaga";

function* mySaga() {
    yield takeLatest(types.LOG_OUT_REQUEST, logOut);
    yield takeLatest(types.AUTHENTICATION_REQUEST, logIn);
    yield takeLatest(types.REGISTRATION_REQUEST, register);
    yield takeLatest(types.USER_UPDATE_REQUEST, updateUserDetails);
}
export default mySaga;