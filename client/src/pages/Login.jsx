import React, { useContext } from 'react'
import '../Login.css'
import background from '../img/landscape.jpg'
import { Link } from 'react-router-dom'
import { CurrentUserContext } from '../components/CurrentUserContext'
import { Redirect } from 'react-router-dom'

function Login() {

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    async function logInUser() {
        const email = document.getElementById('login-email');
        const emailVal = email.value
        const password = document.getElementById('login-password')
        const passwordVal = password.value

        const userInfo = {
            Email: emailVal,
            Password: passwordVal
        };
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' }
        })
        const body = await response.json()
        if (body.login) {
            setCurrentUser({
                loggedInStatus: true,
                Name: body.Name,
                Email: body.Email,
                authToken: body.token
            })
            console.log('success')
        } else {
            //redirect user to login page, send alert
            console.log('fail')
        }
    }

    if (currentUser.loggedInStatus === true) {
        return <Redirect to='/portfolio'/>
    }



    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            overflow: 'hidden'
        }} className="login-wrapper">
            <div className="form">
                <img src="" alt=""/>
                <h2>Login</h2>
                <div className="input-group">
                    <input type="text" name="email" id="login-email"/>
                    <label htmlFor="login-user">Email</label>
                </div>
                <div className="input-group">
                    <input type="password" name="password" id="login-password"/>
                    <label htmlFor="login-password">Password</label>
                </div>
                <input type="submit" value="Login" className="submit-btn" onClick={logInUser}/>
                <div className="p-first">
                    <p>Don't have an account yet?</p>
                    <p>Signup Below</p>
                </div>

                <Link to='/signup'>
                    <button className="redirect">Signup</button>
                </Link>
            </div>

            
        </div>
    )
}

export default Login
