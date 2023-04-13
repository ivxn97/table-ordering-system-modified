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

// Manager: Menu Item search
router.post('/', async (req, res) => {
  var itemType = req.body.itemType;
  var itemID = req.body.itemID;

  console.log('Searching menu with ID:' + itemID + ' from table:' + itemType);
  try {
    await sql.connect(config);

    if(itemType == 'food'){
      await sql.query(`SELECT * FROM foodmenu WHERE item_id = ${itemID}`, (error, rows) => {
            if (error){
              console.log(error);
            }
            res.render('searchFoodMenuItem', {foodmenu: rows.recordset.pop()}, function(err,html) {
            if (err) {
              alert("Error in finding food menu item ");
              console.log(err);
            }
            else {
              res.send(html);
            }
            });
        });
    }
    else if(itemType == 'drink'){
      await sql.query(`SELECT * FROM drinkmenu WHERE item_id = ${itemID}`, (error, rows) => {
        if (error){
          console.log(error);
        }
        res.render('searchDrinkMenuItem', {drinkmenu: rows.recordset.pop()}, function(err,html) {
        if (err) {
          alert("Error in finding drink menu item ");
          console.log(err);
        }
        else {
          res.send(html);
        }
        });
      });
      }
    }
    catch (err) {
      console.error(err);
    }
  })
  module.exports = router;