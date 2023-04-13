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

//Manager: add coupon code
router.post('/', async function(req, res){
    var couponCode = req.body.couponCode;
    var discount = req.body.discount;

    console.log('Adding coupon code: ' + couponCode + ' discount: ' + discount  + '%');
    try {
      await sql.connect(config);
      await sql.query(`INSERT INTO coupon (coupon_code, discount) VALUES('${couponCode}',${discount})`, function(err){
        if(err){
          alert("Error in adding a coupon code")
          console.log(err);
        }
        else{
          alert("coupon code successfully created");
          console.log("Successful coupon code insertion");
        }
      });
    }
    catch (err) {
      console.error(err);
    }
  });
  module.exports = router;