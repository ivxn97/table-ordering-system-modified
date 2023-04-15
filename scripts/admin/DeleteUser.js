// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();
const sql = require('mssql');
const config = require('../../config.js');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));

//Administrator: account deletion
router.post('/', async function(req, res){
  var username = req.body.username;

  console.log('Deleting account with username: ' + username);
  try {
    await sql.connect(config);
    await sql.query(`DELETE FROM accounts WHERE username LIKE '${username}'`, function(err){
      if(err){
        console.log(err);
      }
      else{
        alert("Account successfully deleted");
        console.log("Successful account deletion");
      }
    });
  }
  catch (err) {
    console.error(err);
  }
});
module.exports = router;