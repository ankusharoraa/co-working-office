import React from 'react'
import { Route, Redirect } from 'react-router';

export const authentication = {
    isLoggedIn: false,
    onAuthentication() {
        this.isLoggedIn = true
    },
    getLoginStatus() {
        return this.isLoggedIn;
    }
}
const SecuredRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={
            props => authentication.getLoginStatus() ? (
                <Component {...props} {...rest} />) :
                <Redirect to={{ pathname: '/' }}></Redirect>}></Route>
    )
}

export default SecuredRoute
