import { useState } from 'react';

const UseToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
        //The optional chaining operator "?." provides a way to simplify accessing values through connected objects
        // when it's possible that a reference or function may be undefined or null.
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}

export default UseToken;