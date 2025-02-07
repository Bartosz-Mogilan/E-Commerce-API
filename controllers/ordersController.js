import pool from "../config/db.js";

//Getting all orders

export const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM orders");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error : "Error retrieving orders"})
    }
};

//Getting orders by id

export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({error: "Order not found"});
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error : "Error retrieving order"});
    }
};

