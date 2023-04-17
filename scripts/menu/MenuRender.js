// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();
const sql = require('mssql');
const config = require('../../config.js');
var cookieParser = require('cookie-parser');
const url = require('url');
const querystring = require('querystring');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));
router.use(cookieParser());

// Render Menu
router.get('/', async (req, res) => {
    //Get table number attribute in URL, clean the URL code and assign the table number as a key value pair.
    const query = querystring.parse(req.url);
    const key = Object.keys(query)[0].replace('/?', '');
    const value = Number(Object.values(query)[0]);
    const cleanedObj = Object.assign({}, {[key]: value});
    const tableNumber = cleanedObj.table_number;

    if (tableNumber !== undefined) {
        res.cookie('tableNumber', JSON.stringify(tableNumber));
        try {
            await sql.connect(config);
            await sql.query("SELECT * FROM foodmenu", async (error, rows1) => {
                if (error){
                    console.log(error);
                }
                await sql.query("SELECT * FROM drinkmenu", (error, rows2) => {
                    if (error){
                        console.log(error);
                    }
                    res.render('menuPage', {foodmenu: rows1.recordset, drinkmenu: rows2.recordset});
            })});
        }
        catch (err) {
            console.error(err);
        }
    }
    else if (req.cookies.tableNumber !== 'undefined') {
        try {
            await sql.connect(config);
            await sql.query("SELECT * FROM foodmenu", async (error, rows1) => {
                await sql.query("SELECT * FROM drinkmenu", (error, rows2) => {
                    if (error){
                        console.log(error);
                    }
                    res.render('menuPage', {foodmenu: rows1.recordset, drinkmenu: rows2.recordset});
            })});
        }
        catch (err) {
            console.error(err);
        }
    }
    else {
        res.render("noTable");
    }
  });
  module.exports = router;