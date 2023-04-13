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

// Manager: Coupon viewing
router.post('/', async (req, res) => {
    var couponCode = req.body.couponCode;
    try {
        await sql.connect(config);
        const result = await sql.query("SELECT * FROM coupon", (error, rows) => {
            if (error){
                console.log(error);
            }
            res.render('viewCouponCode', {coupon: rows.recordset});
        });
    }
    catch (err) {
        console.error(err.message);
    }
  })
  module.exports = router;