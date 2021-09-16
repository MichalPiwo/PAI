import { useState, useEffect } from "react";

const UserAlert = () => {
    const [alertClick, setAlertClick] = useState()
    useEffect(()=>{
        setAlertClick("Kliknąłeś w h1");
    },[])
    return(
        <h1 onClick={ () => {alert(alertClick)} }>ALert user</h1>
    )
}
export default UserAlert;