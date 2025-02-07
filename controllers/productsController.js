import pool from "../config/db.js";

//Getting all products

export const getAllProducts = async (req, res) => {
    const { category } = req.query;

    try {
        let result;
        if (category) {
            result = await pool.query("SELECT * FROM products WHERE category = $1", [category]);
        } else {
            result = await pool.query("SELECT * FROM products");
        }
       return res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error : "Error retrieving products"});
    }
};

//Getting products by specific id

export const getProductById = async (req, res) => {
    const id  = parseInt(req.params.id, 10);

    if(isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID"});
    }

    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({error: "Product not found"});
        }

        const product = result.rows[0];
        product.price = parseFloat(product.price);

        return res.status(200).json(product);
    } catch (error) {
        console.error("Error retrieving product", error.message);
        return res.status(500).json({error: "Error retrieving product"});
    }
};

//Creating a new product

export const createProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    try {
        const result = await pool.query("INSERT INTO products (name, description, price, stock, category) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, description, price, stock, category]);
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({error: "Error creating product"});
    }
};

//Updating a product

export const updateProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price, stock, category} = req.body;

    if(isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID"});
    }

    try {
        const result = await pool.query("UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5 WHERE id = $6 RETURNING *", [name, description, price, stock, category, id]);
        if (result.rows.length === 0) {
           return res.status(404).json({ error : "Product not found"});
        }

        const updatedProduct = result.rows[0];
        updatedProduct.price = parseFloat(updatedProduct.price);

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product", error.message);
        res.status(500).json({error : "Error updating product"});
    }
};

//Deleting a prodcut

export const deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID"});
    }

    try {
       const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
        if(result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found"});
        }

        return res.status(200).json({message: "Product deleted Successfully"});
    } catch (error) {
        console.error("Error deleting product", error.message);
        return res.status(500).json({error : "Error deleting product"});
    }
};

