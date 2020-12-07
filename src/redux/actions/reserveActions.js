import * as types from './actionTypes';

export function addReserveRequest(params) {
    return { type: types.ADD_RESERVE_REQUEST,  params};
}