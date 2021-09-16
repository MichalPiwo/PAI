import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Users from './Components/Users'
import UserAlert from "./Components/Alert";
import Login from "./Components/Login"
import useToken from './Components/UseToken';
import Logout from './Components/Logout'
import Patient from'./Components/Patient'

function App() {
    const { token, setToken } = useToken();

    if(!token) {
        return(
            <div className="App">
                <Login setToken={setToken} />
            </div>
            )
    }

  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*    <Logout/>*/}
      {/*    <Patient/>*/}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      {/*</header>*/}
        <Logout/>
        <Patient/>
    </div>
  );
}

export default App;
