import pool from "../config/db.js";

//Getting all users

export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT id, username, email, created_at FROM users");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: "Error retrieving users"});
    }
};

//Getting specific users by id

export const getUserById = async (req, res) => {
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


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {username, email} = req.body;

    if(!username || !email) {
        return res.status(400).json({ error: "Username and email are required"}); 
    }

    const userId = parseInt(id, 10);

    if(isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID"}); 
    }

    try {
        const duplicateEmail = await pool.query("SELECT id FROM users WHERE email = $1 AND id != $2", [email, userId]);
        if(duplicateEmail.rows.length > 0) {
            return res.status(400).json({ error: "Email already in use"}); 
        }

        const result = await pool.query ("UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email", [username, email, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({error: "User not found"});
        }
        
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({error: "Error updating user"});
    }
};

