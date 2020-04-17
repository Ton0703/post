import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function AuthRoute({component: Component, ...rest}) {
    const user = useSelector(state => state.user)
    return (
        <Route
           {...rest}
           render = { props => user? <Redirect to='/' /> : <Component {...props} />}
        />
    )
}
