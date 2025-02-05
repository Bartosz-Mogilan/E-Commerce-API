import express from "express";
import { getAllProducts, getProductById, CreateProduct, UpdateProduct, deleteProducts } from "../controllers/productsController.js";

const router = express.Router();


//Getting all products

router.get("/", getAllProducts);

//Getting product by id

router.get("/:id", getProductById);

//Creating, updating and deleting a product

router.post("/", CreateProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", deleteProducts);

export default router;