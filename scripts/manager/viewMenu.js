// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();
const sql = require('mssql');
const config = require('../../config.js');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));

// Render Menu
router.post('/', async (req, res) => {
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
                res.render('viewMenuItems', {foodmenu: rows1.recordset, drinkmenu: rows2.recordset});
        })});
    }
    catch (err) {
        console.error(err);
    }
  });
  module.exports = router;