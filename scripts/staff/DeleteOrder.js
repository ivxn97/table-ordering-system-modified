// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
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

//Staff: delete item in order
router.post('/', async function(req, res){
    var tableNumber = req.body.tableNumber;
    var itemName = req.body.itemName;
  
    console.log('Deleting ' + itemName + ' from table ' + tableNumber);
    try {
      await sql.connect(config);
      await sql.query(`DELETE FROM kitchenorder WHERE table_no LIKE ${tableNumber} AND food_order LIKE '${itemName}'`, async function(err){
        if(err){
          console.log(err);
        }
        else{
          await sql.query("SELECT * FROM kitchenorder", (error, rows) => {
            if (error){
                console.log(error);
            }
            res.render('viewOrders', {kitchenorder: rows.recordset});
        });
      }});
    }
    catch (err) {
      console.error(err);
    }
  });
  module.exports = router;