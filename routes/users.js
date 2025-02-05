import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/usersController.js";

const router = express.Router();


//User by id, all users and updating a user
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;

