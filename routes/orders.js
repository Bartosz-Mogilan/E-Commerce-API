import express from "express";
import { getAllOrders, getOrderById } from "../controllers/ordersController.js";

const router = express.Router();


//Swagger for getting all orders

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Retrieve all orders
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   total_price:
 *                     type: number
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAllOrders);

//Swagger for getting orders by ID

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Retrieve a specific order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID.
 *     responses:
 *       200:
 *         description: An order object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 total_price:
 *                   type: number
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", getOrderById);

export default router;

