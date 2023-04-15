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

// Staff: Search Order by table name
router.post('/', async (req, res) => {
    var tableNumber = req.body.tableNumber;

    console.log('Searching order from table ' + tableNumber);

    try {
      await sql.connect(config);
      await sql.query(`SELECT * FROM kitchenorder WHERE table_no = ${tableNumber}`, (error, rows) => {
          if (error){
              console.log(error);
          }
          res.render('searchOrder', {kitchenorder: rows.recordset}, function(err,html) {
              if (err) {
                alert("Error Table No not found");
                console.log(err);
              }
              else {
                res.send(html);
                console.log("Order Pulled");
              }
            });
      });
    }
    catch (err) {
      console.error(err);
    }
  })
  module.exports = router;