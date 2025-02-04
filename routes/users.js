const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");;

//User by id, all users and updating a user
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.get("/:id", usersController.updateUser);

module.exports = router;