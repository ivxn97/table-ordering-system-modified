// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();
var alert = require('alert');
const sql = require('mssql');
const config = require('../../config.js');
const bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../Images'));

//Login validation
router.post('/', async function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var profileType = req.body.profileType;

      try {
        await sql.connect(config);
        await sql.query(`SELECT * FROM accounts WHERE (username = '${username}')`, 
        function(err,row){
          if (err) {
            console.log(err);
            alert("Login Failed. Please try again.");
          }
          else if (row.recordset[0] !== undefined) {
            bcrypt.compare(password, row.recordset[0].password, async function(err, result) {
              if (err) {
                console.log(err);
                alert("Login Failed. Please try again.");
              }
              if (result == true) {
                if (row.recordset[0].profiletype == 'owner') {
                  console.log('Login Success');
                  res.sendFile(path.join(__dirname,'../../public/ownerPage.html'));
                }
                else if (row.recordset[0].profiletype == 'manager') {
                  console.log('Login Success');
                  res.sendFile(path.join(__dirname,'../../public/managerPage.html'));
                }
                else if (row.recordset[0].profiletype == 'staff') {
                  console.log('Login Success');
                  try {
                    await sql.query("SELECT * FROM kitchenorder", (error, rows) => {
                        if (error){
                            console.log(error);
                        }
                        res.render('viewOrders', {kitchenorder: rows.recordset});
                    });
                  }
                  catch (err) {
                      console.error(err);
                  }
                }
                else if (row.recordset[0].profiletype == 'admin') {
                  console.log('Login Success');
                  res.sendFile(path.join(__dirname,'../../public/adminPage.html'));
                }
              }
              else if (result == false) {
                console.log('Login Failed');
                alert("Login Failed. Please try again.");
              }
          })}
          else {
            console.log('Login Failed');
            alert("Login Failed. Please try again.");
          }
      })
  }
  catch (err) {
    console.log(err);
    alert("Login Failed. Please try again.");
    res.send();
  }});
  module.exports = router;