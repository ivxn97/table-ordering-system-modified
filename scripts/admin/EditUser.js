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

//Administrator: account editing
router.post('/', async function(req, res){
    var currentUsername = req.body.currentUsername;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var password = req.body.password;
    var profileType = req.body.profileType;
  
    console.log('Editing account with old username: ' + currentUsername);

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.error(err);
      }
      try {
        await sql.connect(config);
        await sql.query(`UPDATE accounts SET first_name = COALESCE(first_name, '${fname}'), last_name = COALESCE(last_name, '${lname}'), username = '${username}', 
            password = COALESCE(password, '${hash}'), profiletype = '${profileType}' WHERE Username = '${username}';`, function(err){
          if(err){
            alert("Error Duplicate Username, Please Choose a different Username")
            console.log(err);
          }
          else{
            alert("Account successfully edited");
            console.log("Account successfully edited");
          }
        });
      }
      catch (err) {
        console.error(err);
      }
    })
  });
  module.exports = router;