const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

//Getting all orders

router.get("/", ordersController.getAllOrders);

//Getting a specific order

router.get("/:id", ordersController.getOrderById);

module.exports = router;

