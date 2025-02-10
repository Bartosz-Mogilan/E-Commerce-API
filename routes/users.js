import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/usersController.js";

const router = express.Router();


//Swagger for getting all users

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAllUsers);

//Swagger for getting Users by Id

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", getUserById);

//Swagger for updating users

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "updatedUser"
 *               email:
 *                 type: string
 *                 example: "updateUserEmail@gmail.com"
 *     responses:
 *       200:
 *         description: The updated user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request (missing or invalid fields).
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", updateUser);

export default router;

