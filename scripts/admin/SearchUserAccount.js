// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();
const sql = require('mssql');
const config = require('../../config.js');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));

// Administrator: Account search
router.post('/', async (req, res) => {
    var username = req.body.username;

    try {
      await sql.connect(config);
      await sql.query(`SELECT * FROM accounts WHERE username = '${username}'`, (error, rows) => {
          if (error){
              console.log(error);
          }
          res.render('adminAccountSearch', {accounts: rows.recordset.pop()}, function(err,html) {
            if (err) {
              res.render('error.ejs');
            }
            else {
              res.send(html);
            }
          });
      });
    }
    catch (err) {
      console.error(err);
    }
  })
  module.exports = router;