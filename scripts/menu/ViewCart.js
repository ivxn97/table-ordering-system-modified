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
  tableNumber = req.cookies.tableNumber;
  if (req.cookies.cart == undefined) {
    res.render('cartEmpty');
  }
  else if (tableNumber == 'undefined') {
    res.render('noTable');
  }
  else {
    res.render('viewCart', {cart: JSON.parse(req.cookies.cart), table: tableNumber});
  }
  });
  module.exports = router;