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
import {
    getTableCollection,
    addTable,
    updateTable,
    deleteTable,
    swapTables
} from "./tableSaga";
import {
    addReserve,
    saveReserve,
    getReserves,
    getPastReserves,
    getFutureReserves
} from "./reserveSaga";

function* mySaga() {
    yield takeLatest(types.LOG_OUT_REQUEST, logOut);
    yield takeLatest(types.AUTHENTICATION_REQUEST, logIn);
    yield takeLatest(types.REGISTRATION_REQUEST, register);
    yield takeLatest(types.USER_UPDATE_REQUEST, updateUserDetails);
    yield takeLatest(types.GET_TABLES_REQUEST, getTableCollection);
    yield takeLatest(types.ADD_TABLE_REQUEST, addTable);
    yield takeLatest(types.UPDATE_TABLE_REQUEST, updateTable);
    yield takeLatest(types.DELETE_TABLE_REQUEST, deleteTable);
    yield takeLatest(types.SWAP_TABLES_REQUEST, swapTables);
    yield takeLatest(types.ADD_RESERVE_REQUEST, addReserve);
    yield takeLatest(types.GET_PAST_RESERVES_REQUEST, getPastReserves);
    yield takeLatest(types.GET_FUTURE_RESERVES_REQUEST, getFutureReserves);
    yield takeLatest(types.GET_RESERVES_REQUEST, getReserves);
    yield takeLatest(types.UPDATE_RESERVE_REQUEST, saveReserve);
}
export default mySaga;