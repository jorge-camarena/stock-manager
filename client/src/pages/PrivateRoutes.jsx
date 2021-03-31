import React, { useContext }from 'react'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { Route, Redirect, Link } from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext)

    function redirect() {
        if (currentUser.loggedInStatus === true) {
            console.log([rest])
            return children
        } else {
            return <Redirect to='/login'/>
        }
    }
    return (
        <div>
            <Route {...rest} render={redirect}/>

        </div>
    )
}

export default PrivateRoute
