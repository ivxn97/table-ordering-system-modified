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

//Manager: menu deletion
router.post('/', async function(req, res){
  var itemType = req.body.itemType;
  var itemID = req.body.itemID;

  console.log('Deleting menu with ID:' + itemID + ' from table:' + itemType);
  try {
    await sql.connect(config);

    if(itemType == 'food'){
      await sql.query(`DELETE FROM foodmenu WHERE item_id LIKE ${itemID}`, function(err){
        if(err){
          console.log(err);
        }
        else{
          alert("Food menu item successfully deleted");
          console.log("Successful food menu item deletion");
        }
      });
    }
    else if(itemType == 'drink'){
      db.run(`DELETE FROM drinkmenu WHERE item_id LIKE ${itemID}`, function(err){
        if(err){
          console.log(err);
        }
        else{
          alert("Drink menu item successfully deleted");
          console.log("Successful drink menu item deletion");
        }
      });
    }
  }
  catch (err) {
    console.error(err);
  }

});
module.exports = router;