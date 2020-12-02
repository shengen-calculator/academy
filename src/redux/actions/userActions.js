import * as types from './actionTypes';

export function updateDetailsRequest(params) {
    return { type: types.USER_UPDATE_REQUEST,  params};
}
