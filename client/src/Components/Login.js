import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/Login.css'

//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

async function loginUser(credentials) {
    return fetch("http://localhost:81/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

const Login = ( {setToken} ) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        let errors = "";
        if(username.length == 0){
            errors += "username can not be empty\n";
        }
        if(password.length == 0){
            errors += "password can not be empty\n";
        }

        if(errors.length > 0) {
            alert(errors)
        }
        else {

            const result = await loginUser({
                username,
                password
            });

            if (result.status == "error") {
                alert("Invalid password or username");
            } else {
                setToken({"token": result.token});
            }
        }
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;