const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;

dotenv.config();

const exampleRoutes = require("./controllers/exampleControllers");

const app = express();

//Middleware

app.use(bodyParser.json());

//Routes

app.use("/exampleControllers", exampleRoutes);



app.get('/', (req, res) => {
    res.send("Hello, E Commerce API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});