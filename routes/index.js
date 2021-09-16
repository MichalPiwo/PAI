const express = require('express');
const router = express.Router();
const dbConn = require('./db')

/* GET home page. */
router.get('/', function(req, res, next) {
   const sql = 'SELECT * FROM user';
    dbConn.query(sql, (err,data) => {
     res.json(data);
   });
});

module.exports = router;
