import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tableReducer(state = initialState.tables, action) {
    switch (action.type) {

        default:
            return state;
    }
}