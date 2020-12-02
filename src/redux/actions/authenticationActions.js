import * as types from './actionTypes';

export function authenticationRequest(params) {
    return { type: types.AUTHENTICATION_REQUEST,  params};
}

export function logoutRequest() {
    return { type: types.LOG_OUT_REQUEST};
}

export function registrationRequest(params, details) {
    return { type: types.REGISTRATION_REQUEST, params, details};
}
