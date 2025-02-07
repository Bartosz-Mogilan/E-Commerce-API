import pool from "../config/db.js";

//Creating a cart item

export const createCartItem = async (req, res) => {
    const {user_id, product_id, quantity} = req.body;

    try {
        const result = await pool.query("INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *", [user_id, product_id, quantity]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: "Error creating cart item"});
    }
};

//Getting cart item by user id

export const getCartById = async (req, res) => {
    const { cartId } = req.params;

    try {
        const result = await pool.query("SELECT * FROM carts WHERE id = $1", [cartId]);
        if (result.rows.length === 0) {
            return res.status(404).json({error : "Cart not found"});
        }
       return res.status(200).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({error : "Error retrieving cart"});
    }
};

//Payment process and creating an order

export const checkoutCart = async (req, res) => {
    const { cartId } = req.params;
    try {
      const cartResult = await pool.query(
        `SELECT c.*, p.price
        FROM carts c
        JOIN products p ON c.product_id = p.id
        WHERE c.id = $1`, 
        [cartId]
      );

      if (cartResult.rows.length === 0) {
        return res.status(404).json({ error: "Cart not found" }); 
      }

      const cartItems = cartResult.rows;
      
      let total_price = 0;
      cartItems.forEach(item => {
        total_price += item.quantity * item.price;
      });


      const orderResult = await pool.query(
        "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *",
        [cartItems[0].user_id, total_price]
      );
      
      await pool.query("DELETE FROM carts WHERE id = $1", [cartId]);
  
      res.status(200).json({ message: "Checkout successful", order: orderResult.rows[0] });
    } catch (error) {
      res.status(500).json({ error: "Error during checkout" });
    }
  };
  

  






