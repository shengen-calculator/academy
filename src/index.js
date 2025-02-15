import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from "./redux/configureStore";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import ToastrMessage from "./component/ToastrMessage";
import {SnackbarProvider} from 'notistack';

const {store, persistent} = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistent}>
            <SnackbarProvider maxSnack={3}>
                <React.StrictMode>
                    <ToastrMessage/>
                    <App/>
                </React.StrictMode>
            </SnackbarProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
