// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
const { table } = require('console');
var router = express.Router();
const sql = require('mssql');
const config = require('../../config.js');
var cookieParser = require('cookie-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));
router.use(cookieParser());

//Date formatting
let dateFormat = new Date();
//adjust 0 before single digit date
let date = ("0" + dateFormat.getDate()).slice(-2);
//current month
let month = ("0" + (dateFormat.getMonth() +1)).slice(-2);
//current year
let year = dateFormat.getFullYear();

// MENU: Push order from cart to kitchenorder
router.post('/', async function(req, res){
  var email = req.body.email;
  var tableNo = req.cookies.tableNumber;
  var dateFinal = (year + "-" + month + "-" + date);

  // Get existing cart from cookies
  const existingCart = JSON.parse(req.cookies.cart);

  // calculate Total price of cart
  let totalPrice = 0;
  existingCart.forEach(item => {
    totalPrice += item.price * item.quantity;
  })

  // Get most ordered item from the current cart
  const mostOrdered = existingCart.reduce((acc, item) => {
    return item.quantity > acc.quantity ? item : acc
  })

  // Send order to the kitchen, and customer data, then render checkout success page.
  try {
    await sql.connect(config);
    existingCart.forEach(async item => {
      await sql.query(`INSERT INTO kitchenorder (food_order, quantity, table_no, order_status) 
        VALUES('${item.item_name}', ${item.quantity}, ${tableNo}, 'new order')`, async (err) => {
        if (err) {
          console.error(err);
        }
      })
    })

    await sql.query(`INSERT INTO customer (email, date, spending, food_order) 
      VALUES('${email}', '${dateFinal}', ${totalPrice}, '${mostOrdered.item_name}')`, async (err) => {
      if (err) {
        console.error(err);
      }
      else {
        res.render('checkoutSuccess', {cart: existingCart});
      }
    })
  }
  catch (err) {
    console.error(err);
  }
});
module.exports = router;