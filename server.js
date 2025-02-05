import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

//Middleware

app.use(bodyParser.json());

//Routes

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";

//Using the routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

//Default route

app.get('/', (req, res) => {
    res.send("Welcome to the E-Commerce API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;