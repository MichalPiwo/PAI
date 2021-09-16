const express = require('express');
const router = express.Router();
const dbConn = require('./db');
const jwt = require("jsonwebtoken");


router.post('/create', (req, res) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const PESEL = req.body.PESEL;
    const token = req.body.token;


    console.log(req.body);
    console.log(token);

    var decoded;
    console.log("pacireny/ router.post('/create'");
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decoded);
        console.log(decoded.user_id);
    } catch (e) {
        console.log(e);

        res.send({
            status: 'error',
            errorName: 'bad token'
        });
        return;
    }

        dbConn.query(
            'SELECT * FROM doctor WHERE UserName = ?',
            [decoded.user_id],
            (err, data) => {

                console.log(data)

                if (data.length <= 0) {
                    res.send({
                        status: 'error',
                        errorName: 'bad token'
                    });
                }
                else{
                    dbConn.query(
                        'SELECT * FROM patient WHERE PESEL = ?',
                        [PESEL],
                        (err, data) => {

                            console.log(data)

                            if (data.length >= 1) {
                                res.send({
                                    status: 'error',
                                    errorName: 'user with this PESEL already exists'
                                });
                            }
                            else{
                                    dbConn.query(
                                        'INSERT INTO patient (FirstName, LastName, PESEL) VALUES (?, ?, ?)',
                                        [FirstName, LastName, PESEL],
                                        (err,data) => {

                                            console.log("po insercie pacjenta");
                                        });
                                    res.json({
                                        status: 'ok'
                                    })
                            }
                        });
                }
            });

});

router.post('/createNote', (req, res) => {
    const note = req.body.note;
    const PESEL = req.body.PESEL;
    const token = req.body.token;

    console.log(req.body);
    console.log(token);

    var decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decoded);
        console.log(decoded.user_id);
    } catch (e) {
        console.log(e);

        res.send({
            status: 'error',
            errorName: 'bad token'
        });
        return;
    }

    let noteDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    dbConn.query(
        'INSERT INTO notes (PESEL, Note, Date, DoctorUserName) VALUES (?, ?, ?, ?)',
        [PESEL, note, noteDate, decoded.user_id],
        (err, data) => {
            res.send({
                status: 'ok'
            });
        }
        );

});

router.post('/getNote', (req, res) => {
    const PESEL = req.body.PESEL;
    const token = req.body.token;

    console.log(req.body);
    console.log(token);

    var decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decoded);
        console.log(decoded.user_id);
    } catch (e) {
        console.log(e);

        res.send({
            status: 'error',
            errorName: 'bad token'
        });
        return;
    }

    dbConn.query(
        'SELECT * FROM notes WHERE PESEL = ?',
        [PESEL],
        (err, data) => {
            console.log("halo notataki pacjeta z bazy");
            console.log(data);
            res.send({
                status: 'ok',
                data: data
            });
        }
    );

});

module.exports = router;