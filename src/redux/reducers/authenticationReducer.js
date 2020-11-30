import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authenticationReducer(state = initialState.authentication, action) {
    switch (action.type) {

        default:
            return state;
    }
}