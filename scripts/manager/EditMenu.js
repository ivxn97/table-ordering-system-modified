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

//Manager: coupon edit
router.post('/', async function(req, res){
  var itemType = req.body.itemType;
  var itemName = req.body.itemName;
  var itemPrice = req.body.itemPrice;
  var itemID = req.body.itemID;

  try {
    await sql.connect(config);
    console.log('Editing ' + itemType + ' menu item with item ID: ' + itemID);
  
    if(itemType == 'food'){
      await sql.query(`UPDATE foodmenu SET item_name = '${itemName}', item_price = '${itemPrice}' WHERE item_id = ${itemID};`, function(err){
          if(err){
            alert("Error editing food menu item")
            console.log(err);
          }
          else{
            alert("Food menu item successfully edited");
            console.log("Food menu item successfully edited");
          }
      });
    } 
    else if(itemType == 'drink'){
      await sql.query(`UPDATE drinkmenu SET item_name = '${itemName}', item_price = '${itemPrice}' WHERE item_id = ${itemID};`, function(err){
        if(err){
          alert("Error editing drink menu item")
          console.log(err);
        }
        else{
          alert("Drink menu item successfully edited");
          console.log("Drink menu item successfully edited");
        }
      });
    }
  }
  catch (err) {
    console.error(err);
  }
});
module.exports = router;