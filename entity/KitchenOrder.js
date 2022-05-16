// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../public')));
router.use('/img', express.static(__dirname + '../Images'));

// Push order from cart to kitchenorder
router.post('/', function(req, res){
var db = new sqlite3.Database('restaurant.db');
console.log('Sending Cart Order to Kitchen Staff');
db.all('SELECT item_name, quantity FROM cart', function(err,row)
{
    res.send(row);
    if (err){
        alert('Error in sending order to kitchen')
        console.log(error);
    }
});

db.close();
});
module.exports = router;