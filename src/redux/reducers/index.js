import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import authentication from './authenticationReducer';
import message from './messageReducer';
import apiCallsInProgress from "./apiStatusReducer";
import tables from './tableReducer';
import reserves from './reservationReducer';
import storage from 'redux-persist/lib/storage';


export const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        'message',
        'authentication',
        'apiCallsInProgress',
        'tables',
        'reserves'
    ]
};

const authPersistConfig = {
    key: 'authentication',
    storage: storage,
    blacklist: ['logging', 'outing']
};


const rootReducer = combineReducers({
    authentication: persistReducer(authPersistConfig, authentication),
    apiCallsInProgress,
    tables,
    reserves,
    message
});

export default rootReducer;