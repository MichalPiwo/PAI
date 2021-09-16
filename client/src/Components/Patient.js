import React, { useState } from 'react';

async function addPatient(dataPatient) {
    return fetch("http://localhost:81/patient/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPatient)
    })
        .then(data => data.json())
}

async function addPatientNote(dataPatient) {
    return fetch("http://localhost:81/patient/createNote", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPatient)
    })
        .then(data => data.json())
}

async function getPatientNote(dataPatient) {
    return fetch("http://localhost:81/patient/getNote", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPatient)
    })
        .then(data => data.json())
}

const Patient = () => {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [PESEL, setPESEL] = useState("");
    const [note, setNote] = useState("");
    const [menuOpt, setMenuOpt] = useState(0);
    const [notes, setNotes] = useState("");

    function validateName() {
        let errors = "";
        if(FirstName.length == 0){
            return  "FirstName can not be empty\n";
        }
        return "";
    }

    function validateLastName() {
        let errors = "";
        if(LastName.length == 0){
            return  "LastName can not be empty\n";
        }
        return "";
    }

    function getTokenStr(){
        const tokenSet = JSON.parse(sessionStorage.getItem("token"));
        console.log(tokenSet);
        const token = tokenSet.token;
        return token;
    }

    function validatePESEL() {
        let errors = "";
        if(PESEL.length != 11){
            return  "PESEL should contain 11 digits\n";
        }
        else{
            if(PESEL.match("[0-9]{11}") == null) {
                return "PESEL should contain only digits\n";
            }
        }
        return "";
    }

    function validateNote() {
        let errors = "";
        if(note.length == 0){
            return  "LastName can not be empty\n";
        }
        return "";
    }

    const handlePatientAdd = async e => {
        e.preventDefault();

        let errors = "";
        errors += validateName();
        errors += validateLastName();
        errors += validatePESEL();


        if(errors.length > 0){
            alert(errors)
        }
        else {
            const token = getTokenStr();

            console.log(token);
            console.log("token wysylamy do pacient");

            const result = await addPatient({
                FirstName,
                LastName,
                PESEL,
                token
            });

            if (result.status == "error"){
                if(result.errorName == "bad token"){
                    alert("Invalid token, please login again");
                    sessionStorage.removeItem("token");
                    window.location.href = '/';
                }
                alert(result.errorName)
            }
            else {
                alert("User with PESEL " + PESEL + " added successfully");
            }
        }
    }

    const handleNoteAdd = async e => {
        e.preventDefault();

        let errors = "";
        errors += validateNote();
        if(errors.length > 0){
            alert(errors)
        }

        const token = getTokenStr();

        const result = await addPatientNote({
            note,
            PESEL,
            token
        });

        if (result.status == "error"){
            if(result.errorName == "bad token"){
                alert("Invalid token, please login again");
                sessionStorage.removeItem("token");
                window.location.href = '/';
            }
            alert(result.errorName)
        }
        else {
            alert("Note added successfully");
        }
    }

    const handleFindNotes = async e => {
        e.preventDefault();

        let errors = "";
        errors += validatePESEL();
        if(errors.length > 0){
            alert(errors)
        }

        const token = getTokenStr();

        const result = await getPatientNote({
            PESEL,
            token
        });

        if (result.status == "error"){
            if(result.errorName == "bad token"){
                alert("Invalid token, please login again");
                sessionStorage.removeItem("token");
                window.location.href = '/';
            }
            alert(result.errorName)
        }
        else{
            setNotes(result.data);
            console.log(result.data);
            setMenuOpt(3);
        }
    }

    console.log(menuOpt);

    return(
        <div>
            <button onClick={() => {setMenuOpt(0)}}>addUser</button>
            <button onClick={() => {setMenuOpt(1)}}>find notes</button>
            <button onClick={() => {setMenuOpt(2)}}>add note</button>
            {menuOpt == 0 &&
                <div>
                    <h1>Add Patient</h1>
                    <form onSubmit={handlePatientAdd}>
                        <label>
                            <p>patient FirstName</p>
                            <input type="text" onChange={e => setFirstName(e.target.value)} />
                        </label>
                        <label>
                            <p>patient LastName</p>
                            <input type="text" onChange={e => setLastName(e.target.value)} />
                        </label>
                        <label>
                            <p>patient PESEL</p>
                            <input type="text" onChange={e => setPESEL(e.target.value)} />
                        </label>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            }
            {(menuOpt == 1 || menuOpt == 3) &&
                <div>
                    <h1>Find Notes</h1>
                    <form onSubmit={handleFindNotes}>
                        <label>
                            <p>patient PESEL</p>
                            <input type="text" value={PESEL} onChange={e => setPESEL(e.target.value)} />
                        </label>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            }
            {menuOpt == 2 &&
                <div>
                    <h1>Add notes</h1>
                    <form onSubmit={handleNoteAdd}>
                        <label>
                            <p>patient PESEL</p>
                            <input type="text" value={PESEL} onChange={e => setPESEL(e.target.value)} />
                        </label>
                        <label>
                            <p>note</p>
                            <textarea rows="6" cols="90"  onChange={e => setNote(e.target.value)}></textarea>
                        </label>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            }
            {menuOpt == 3 &&
                <table>
                    <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">DOCTOR</th>
                        <th scope="col">NOTE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notes.map(field => (
                        <tr key={field.id}>
                            <th scope="row">{field.Date}</th>
                            <td>{field.DoctorUserName}</td>
                            <td>{field.Note}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Patient;