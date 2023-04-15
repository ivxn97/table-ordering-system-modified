// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();
const sql = require('mssql');
const config = require('../../config.js');
const bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));

const saltRounds = 10;

//Administrator: account creation
router.post('/', async function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var password = req.body.password;
    var profileType = req.body.profileType;
  
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      console.log('Creating account with first name: ' + fname + ' last name: ' + lname  + ' username: '
      + username + ' password: ' + hash + ' profile type: ' + profileType);
      if (err) {
        console.error(err);
      }

      try {
        await sql.connect(config);
        await sql.query(`INSERT INTO accounts (first_name, last_name, username, password, profiletype) 
              VALUES('${fname}','${lname}','${username}','${hash}','${profileType}')`, function(err){
          if(err){
            alert("Error Duplicate Username, Please Choose a different Username")
            console.log(err);
          }
          else{
            alert("Account successfully created");
            console.log("Successful account creation");
          }
        });
      }
      catch (err) {
        console.error(err);
      }
    })
  });
  module.exports = router;