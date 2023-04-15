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

//Staff: Order edit
router.post('/', async function(req, res){
    var tableNumber = req.body.tableNumber;
    var itemName = req.body.itemName;
    var quantity = req.body.editQty;

    try {
      await sql.connect(config);
      console.log('Editing ' + tableNumber + ' with item name: ' + itemName);
    
      await sql.query(`UPDATE kitchenorder SET quantity = ${quantity} WHERE table_no = ${tableNumber} AND food_order = '${itemName}';`, function(err) {
          if(err){
              alert("Error editing Quantity")
              console.log(err);
            }
            else{
              alert("Quantity successfully edited");
              console.log("Quantity successfully edited");
            }
      });
    }
    catch (err) {
      console.error(err);
    }
  });
  module.exports = router;