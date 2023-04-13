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

// Manager: search coupon
router.post('/', async (req, res) => {
    var couponCode = req.body.couponCode;
    try {
      await sql.connect(config);
      await sql.query(`SELECT * FROM coupon WHERE coupon_code = '${couponCode}'`, (error, rows) => {
          if (error){
              console.log(error);
          }
          res.render('searchCouponCode', {coupon: rows.recordset.pop()}, function(err,html) {
            if (err) {
              alert("Error in finding coupon code");
              console.log(err);
            }
            else {
              res.send(html);
            }
          });
      });
    }
    catch (err) {
      console.error(err);
    }
  })
  module.exports = router;