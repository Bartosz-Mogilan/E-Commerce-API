const pool = require("../config/db");

exports.getAllProducts = async (req, res) => {
    const { category } = req.query;
    try {
        let result;
        if (category) {
            result = await pool.query("SELECT * FROM prodcuts WHERE category = $1", [category]);
        } else {
            result = await pool.query("SELECT * FROM products");
        }
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error : "Error retrieving products"});
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({error: "Product not found"});
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: "Error retrieving product"});
    }
};

exports.CreateProduct = async (req, res) => {
    const { name, description, price, stock, category} = req.body;
    try {
        const result = await pool.query("INSERT INTO prodcuts (name, description, price, stock, category) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, description, price, stock, category]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: "Error creating product"});
    }
};

exports.UpdateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category} = req.body;
    try {
        const result = await pool.query("UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5 WHERE id = $6 RETURNING *", [name, description, price, stock, category, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error : "Product not found"});
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error : "Error updating product"});
    }
};

