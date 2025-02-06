import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";

const router = express.Router();


//Getting all products

router.get("/", getAllProducts);

//Getting product by id

router.get("/:id", getProductById);

//Creating, updating and deleting a product

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;