// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();
var cookieParser = require('cookie-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));
router.use(cookieParser());

// Menu: View Cart
router.post('/', (req, res) => {
    res.render('viewCart', {cart: JSON.parse(req.cookies.cart)});
  });
  module.exports = router;