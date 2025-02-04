const pool = require("../config/db");

//Getting all users

exports.getAllUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT id, username, email, created_at FROM users");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: "Error retrieving users"});
    }
};

//Getting specific users by id

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query ("SELECT id, username, email, created_at FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({error: "User not found"});
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: "Error retrieving user"});
    }
};

//Updating a user


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const {username, email} = req.body;
    try {
        const result = await pool.query ("UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email", [username, email, id]);
        if (result.rows.length === 0) {
            return res.status(400).json({error: "User not found"});
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: "Error updating user"});
    }
};

