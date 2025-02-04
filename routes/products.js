const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

//Getting all products

router.get("/", productsController.getAllProducts);

//Getting product by id

router.get("/:id", productsController.getProductById);

//Creating, updating and deleting a product

router.post("/", productsController.CreateProduct);
router.put("/:id", productsController.UpdateProduct);
router.delete("/:id", productsController.deleteProducts);

module.exports = router;