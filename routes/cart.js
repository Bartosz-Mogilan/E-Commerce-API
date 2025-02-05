import express from "express";
import { createCartItem, getCartById, checkoutCart } from "../controllers/cartController.js";

const router = express.Router();


//Creating a new cart item

router.post("/", createCartItem);

//Getting a specifc cart 

router.get("/:cartId", getCartById);

//Checking out the cart

router.post("/:cartId/checkout", checkoutCart);

export default router;

