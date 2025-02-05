import express from "express";
import { getAllOrders, getOrderById } from "../controllers/ordersController.js";

const router = express.Router();


//Getting all orders

router.get("/", getAllOrders);

//Getting a specific order

router.get("/:id", getOrderById);

export default router;

