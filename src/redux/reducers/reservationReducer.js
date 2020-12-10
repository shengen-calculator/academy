import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function reservationReducer(state = initialState.reserves, action) {
    switch (action.type) {

        case types.ADD_RESERVE_SUCCESS:
            return {
                ...state, future: {
                    ...state.future,
                    items: [
                        ...state.future.items, {
                            ...action.reserve.item, id: action.reserve.id
                        }
                    ]
                }
            };

        case types.UPDATE_RESERVE_SUCCESS:
            return {
                ...state, future: {
                    ...state.future,
                    items: [
                        ...state.future.items.filter(x => x.id !== action.reserve.id), {
                            ...action.reserve.item, id: action.reserve.id
                        }
                    ]
                }
            };

        case types.DELETE_RESERVE_SUCCESS:
            return {
                ...state, future: {
                    ...state.future,
                    items: [
                        ...state.future.items.filter(x => x.id !== action.params.reserveId)
                    ]
                }
            };

        case types.GET_PAST_RESERVES_SUCCESS:
            return {
                ...state, past: {
                    items: action.reserves,
                    tableRef: action.params.tableRef
                }
            };

        case types.GET_FUTURE_RESERVES_SUCCESS:
            return {
                ...state, future: {
                    items: action.reserves,
                    tableRef: action.params.tableRef
                }
            };

        case types.GET_RESERVES_REQUEST:
            return {
                ...state, report: null
            };

        case types.GET_RESERVES_SUCCESS:
            return {
                ...state, report: action.reserves
            };

        default:
            return state;
    }
}