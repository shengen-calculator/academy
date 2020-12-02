import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    const isAuth = auth.name && auth.restaurant;
    const path = auth.name ? (auth.restaurant ? '': '/name') : '/login';
    return isAuth ?
        <Route {...rest} /> :
        <Redirect to={{pathname: path, state: { from: rest.location } }}/>};
export default PrivateRoute;