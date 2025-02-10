import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";

const router = express.Router();


//Swagger for getting all products

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve all products
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of products to skip for pagination
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: integer
 *                   category:
 *                     type: string
 */
router.get("/", getAllProducts);


//Swagger for getting product by ID

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *                 category:
 *                   type: string
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);


//Swagger for creating a product

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Test Product"
 *               description:
 *                 type: string
 *                 example: "Testing the description"
 *               price:
 *                 type: number
 *                 example: 10
 *               stock:
 *                 type: integer
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: "Testing the category"
 *     responses:
 *       200:
 *         description: The product was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *                 category:
 *                   type: string
 *       400:
 *         description: Invalid input data or product already exists
 *       500:
 *         description: Internal server error
 */
router.post("/", createProduct);


//Swagger for updating a product

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: The product was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *                 category:
 *                   type: string
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateProduct);

//Swagger for deleting a product

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   type: object
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteProduct);

export default router;