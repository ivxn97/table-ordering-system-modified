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

//Owner: Generating Weekly Report Function
router.post('/', async function(req, res){
    var dateInput = req.body.date1;
    var dateInput2 = req.body.date2;

    console.log('Generating Weekly Report For Date: ' + dateInput + ' To ' + dateInput2 );
    try {
        await sql.connect(config);
        await sql.query(`SELECT * FROM customer WHERE date BETWEEN '${dateInput}' AND '${dateInput2}'`, (error, rows) => {
            if (error){
                console.log(error);
            }
            else {
            res.render('weeklyReportView', {customer: rows.recordset});
            }
        });
    }
    catch (err) {
        console.error(err);
    }
  })
  module.exports = router;