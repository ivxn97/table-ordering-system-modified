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

// Staff: View all Orders
router.post('/', async (req, res) => {
    try {
        await sql.connect(config);
        await sql.query("SELECT * FROM kitchenorder", (error, rows) => {
            if (error){
                console.log(error);
            }
            res.render('viewOrders', {kitchenorder: rows.recordset});
        });
    }
    catch (err) {
        console.error(err);
    }
  })
  module.exports = router;