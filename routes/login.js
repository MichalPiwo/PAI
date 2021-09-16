const express = require('express');
const router = express.Router();
const dbConn = require('./db');
const jwt = require("jsonwebtoken");


router.post('/', (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    dbConn.query(
        'SELECT * FROM doctor WHERE UserName = ? AND Password =?',
        [userName, password],
        (err,data) => {

            console.log(data);

            if (err || data.length <= 0) {
                console.log(err);

                res.send({
                    status: 'error'
                });
            }
            else {
                console.log(process.env.TOKEN_KEY)

                const token = jwt.sign(
                    {user_id: userName},
                    process.env.TOKEN_KEY,
                    {
                         expiresIn: "8h",
                    }
                );

                console.log(token);
                console.log(token);

                const decoded = jwt.verify(token, process.env.TOKEN_KEY);

                console.log(decoded)

                res.send({
                    token: token,
                    status: 'ok'
                });
            }
    });
});

module.exports = router;