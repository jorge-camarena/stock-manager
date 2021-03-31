import React, { useState }from 'react'
import background from '../img/landscape.jpg'
import { Link } from 'react-router-dom'
import fetch from 'node-fetch'
import { Redirect } from 'react-router-dom'

function Signup() {
    const [createdAccount, setCreatedAccount] = useState()

    async function registerUser() {
        const name = document.getElementById('signup-name');
        const nameVal = name.value
        const email = document.getElementById('signup-email');
        const emailVal = email.value
        const password = document.getElementById('signup-password')
        const passwordVal = password.value

        const userInfo = {
            Name: nameVal,
            Email: emailVal,
            Password: passwordVal
        };
        await fetch('http://localhost:5000/api/create-user', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(body => {
              console.log(body);
              setCreatedAccount(body.success);
          });
    }

    if (createdAccount) {
        return <Redirect to="/login"/>
    }

    
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            overflow: 'hidden'
        }} className="login-wrapper">
        <div className="form">
            <h2>Signup</h2>
            <div className="input-group">
                <input type="text" name="name" id="signup-name"/>
                <label htmlFor="login-name">Name</label>
            </div>
            <div className="input-group">
                <input type="text" name="email" id="signup-email"/>
                <label htmlFor="login-user">Email</label>
            </div>
            <div className="input-group">
                <input type="password" name="password" id="signup-password"/>
                <label htmlFor="login-password">Password</label>
            </div>
            <input type="submit" value="Signup" className="submit-btn" onClick={registerUser}/>
            <div className="p-first">
                <p>Already have an account?</p>
                <p>Login Below</p>
            </div>

            <Link to='/login'>
                <button className="redirect">Login</button>
            </Link>
        </div>

        
    </div>
    )
}

export default Signup
