const pool = require("../config/db");

//Getting all orders

exports.getAllOrders = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM orders");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error : "Error retrieving orders"})
    }
};

//Getting orders by id

exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({error: "Order not found"});
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error : "Error retrieving order"});
    }
};

