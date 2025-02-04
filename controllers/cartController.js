const pool = require("../config/db");

//Creating a cart item

exports.createCartItem = async (req, res) => {
    const {user_id, product_id, quantity} = req.body;
    try {
        const result = await pool.query("INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3 RETURNING *", [user_id, product_id, quantity]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: "Error creating cart item"});
    }
};

//Getting cart item by user id

exports.getCartById = async (req, res) => {
    const { cartId } = req.params;
    try {
        const result = await pool.query("SELECT * FROM carts WHERE id = $1", [cartId]);
        if (result.rows.length === 0) {
            return res.status(404).json({error : "Cart not found"});
        }
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error : "Erro retrieving cart"});
    }
};

//Payment process and creating an order

exports.checkoutCart = async (req, res) => {
    const { cartId } = req.params;
    try {
      const cartResult = await pool.query("SELECT * FROM carts WHERE id = $1", [cartId]);
      if (cartResult.rows.length === 0) {
        return res.status(404).json({ error: "Cart not found" });
      }
      const cartItems = cartResult.rows;
  
     
      cartItems.forEach(item => {
        total_price += item.quantity;
      });
      const orderResult = await pool.query(
        "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *",
        [cartItems[0].user_id, total_price]
      );
      await pool.query("DELETE FROM carts WHERE id = $1", [cartId]);
  
      res.status(201).json({ message: "Checkout successful", order: orderResult.rows[0] });
    } catch (error) {
      res.status(500).json({ error: "Error during checkout" });
    }
  };

  






