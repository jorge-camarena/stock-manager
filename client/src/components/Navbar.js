import React, { useContext } from 'react'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { Redirect, Link } from 'react-router-dom'

function Navbar({ children }) {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    function logOut() {
        setCurrentUser({
            loggedInStatus: false,
            Name: '',
            Email: '',
            authToken: null
          })

    }

    if (currentUser.loggedInStatus === false) {
        return <Redirect to='/login'/>
    }

    return (
        <div>
            <header>
                <p className="logo">Stock manager</p>
                <div>{children}</div>
                <nav>
                    <ul className="nav__links">
                        <li><Link to='/portfolio'>Portfolio</Link></li>
                        <li><Link to='/explore'>Explore</Link></li>
                        <li><Link to='/explore'>Simulate</Link></li>
                    </ul>
                </nav>
                <a className="cta" href=""><button className="logout" onClick={logOut}>Logout</button></a>
            </header>
            
        </div>
    )
}

export default Navbar
