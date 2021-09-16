import React, { useState } from 'react';

const Logout = () => {

    const [loggedOut, setloggedOut] = useState(false);

    const logout = () =>{
        sessionStorage.removeItem("token");
        setloggedOut(true)
    }

    if(loggedOut){
        window.location.href = '/';
    }

    return(
        <div>
                <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Logout;