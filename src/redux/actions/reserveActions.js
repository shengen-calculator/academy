import * as types from './actionTypes';

export function addReserveRequest(params) {
    return { type: types.ADD_RESERVE_REQUEST,  params};
}

export function getFutureReservesRequest(params) {
    return { type: types.GET_FUTURE_RESERVES_REQUEST,  params};
}

export function getPastReservesRequest(params) {
    return { type: types.GET_PAST_RESERVES_REQUEST,  params};
}

export function getReservesRequest(params) {
    return { type: types.GET_RESERVES_REQUEST,  params};
}