import express from "express";
import { createCartItem, getCartById, checkoutCart } from "../controllers/cartController.js";

const router = express.Router();


//Swagger for creating a Cart Item

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Create a new cart item
 *     description: Adds a new item to the cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - product_id
 *               - quantity
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 product_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post("/", createCartItem);


//Swagger for getting an cart item by ID

/**
 * @swagger
 * /api/v1/cart/{cartId}:
 *   get:
 *     summary: Retrieve a specific cart item by ID
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cart item ID.
 *     responses:
 *       200:
 *         description: A cart item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 product_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:cartId", getCartById);


//Swagger for checking out Cart

/**
 * @swagger
 * /api/v1/cart/{cartId}/checkout:
 *   post:
 *     summary: Checkout a cart
 *     description: Calculates total price, creates an order, and clears the cart.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cart item ID to checkout.
 *     responses:
 *       200:
 *         description: Checkout successful, returns the created order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     total_price:
 *                       type: number
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/:cartId/checkout", checkoutCart);

export default router;

