const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

//Creating a new cart item

router.post("/", cartController.createCartItem);

//Getting a specifc cart 

router.get("/:cartId", cartController.getCartById);

//Checking out the cart

router.post("/:cartId/checkout", cartController.checkoutCart);

module.exports = router;

