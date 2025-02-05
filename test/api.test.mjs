import request from "supertest";
import { expect } from "chai";
import app from "../server.js";


describe("E-Commerce API Endpoints", function () {
    this.timeout(5000);

    //Variables to store data

    let testUser = {};
    let authToken = "";
    let testCartId = "";
    let testOrderId ="";
    let testProduct = {};

    //Default Route

    describe("GET /", () => {
        it("should return a message", async () => {
            const res = await request(app)
            .get("/");
            expect(res.status).to.equal(200);
            expect(res.text).to.include("Welcome to the E-Commerce API");
        });
    });

    //Auth Endpoints

    //Registering a user

    describe("POST /api/v1/auth/register", () => {
        it("Should register a new user", async () => {
            const userData = {
                username: "testuser",
                email: "testuser@gmail.com",
                password: "password123",
            };

            const res = await request(app)
            .post("/api/v1/auth/register")
            .send(userData);
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("id");
            expect(res.body).to.have.property("username", userData.username);
            expect(res.body).to.have.property("email", userData.email);
            testUser = res.body;
        });
    });

    //Logging in a user

    describe("POST /api/v1/auth/login", () => {
        it("Should login in an existing user and return a token", async () => {
            const loginData = {
                email: "testuser@gmail.com",
                password: "password123",
            };

            const res = await request(app)
            .post("/api/v1/auth/login")
            .send(loginData);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("token");
            authToken = res.body.token;
        });
    });

    //User Endpoints

    //Getting all users

    describe("User Endpoints", () => {
        it("Should retrieve all users", async() => {
            const res = await request(app)
            .get("/api/v1/users")
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });

        //Getting a specific user by id

        it("Should get a specific user by id", async () => {
            const res = await request(app)
            .get(`/api/v1/users/${testUser.id}`)
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("id", testUser.id);
        });

        //Updating a users details

        it("Should update a users details", async () => {
            const updateUser = {
                username: "updatedUser",
                email: "updateUserEmail@gmail.com",
            };
            const res = await request(app)
            .put(`/api/v1/users/${testUser.id}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(updateUser);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("username", updateUser.username);
            expect(res.body).to.have.property("email", updateUser.email);
        });
    });

    //Cart Endpoints

    //Creating a new cart

    describe("Cart Endpoints", () => {
        it("Should create a new cart item", async () => {
            const cartData = {
                user_id: testUser.id,
                product_id: 1,
                quantity: 2,
            };

            const res = await request(app)
            .post("/api/v1/cart")
            .set("Authorization", `Bearer ${authToken}`)
            .send(cartData);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("id");
            testCartId = res.body.id;
        });

        //Retrieving cart by id

        it("Should retrieve a cart by id", async () => {
            const res = await request(app)
            .get(`/api/v1/cart/${testCartId}`)
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });

        //Checking out the cart

        it("Should checkout the cart", async () => {
            const res = await request(app)
            .post(`/api/v1/cart/${testCartId}/checkout`)
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message", "Checkout successful");
            expect(res.body).to.have.property("order");
            testOrderId = res.body.order.id;
        });
    });

    //Order Endpoints

    //Retrieving all orders

    describe("Order Endpoints", () => {
        it("Should retrieve all orders", async () => {
            const res = await request(app)
            .get("/api/v1/orders")
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });

        //Retrieving specific orders by Id

        it("Should retrieve a specific order by id", async () => {
            const res = await request(app)
            .get(`/api/v1/orders/${testOrderId}`)
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("id", testOrderId);
        });
    });

    //Product Endpoints

    //Retrieving all products

    describe("Product Endpoint", () => {
        it("Should return all products", async () => {
            const res = await request(app)
            .get("/api/v1/products");
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });

        //Creating a new product

        it("Should create a new product", async () => {
            const productData = {
                name: "Test Product",
                description: "Testing the description",
                price: 10,
                stock: 100,
                category: "Testing the category",
            };

            const res = await request(app)
            .post("/api/v1/products")
            .set("Authorization", `Bearer ${authToken}`)
            .send(productData);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("id");
            expect(res.body).to.have.property("name", productData.name);
            expect(res.body).to.have.property("description", productData.description);
            expect(res.body).to.have.property("price", productData.price);
            expect(res.body).to.have.property("stock", productData.stock);
            expect(res.body).to.have.property("category", productData.category);
            testProduct = res.body;
        });

        //Retrieving product by id

        it("Should retrieve a product by id", async () => {
            const res = await request(app)
            .get(`/api/v1/products/${testProduct.id}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("id", testProduct.id);
            expect(res.body).to.have.property("name", testProduct.name);
        });

        //Updating existing products

        it("Should update an existing product", async () => {
            const updatedProduct = {
                name: "Updated Product Name",
                description: "Description of the updated product",
                price: 20,
                stock: 250,
                category: "The updated category",
            };

            const res = await request(app)
            .put(`/api/v1/products/${testProduct.id}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(updatedProduct);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("id", testProduct.id);
            expect(res.body).to.have.property("name", updatedProduct.name);
            expect(res.body).to.have.property("description", updatedProduct.description);
            expect(res.body).to.have.property("price", updatedProduct.price);
            expect(res.body).to.have.property("stock", updatedProduct.stock);
            expect(res.body).to.have.property("category", updatedProduct.category);
            testProduct = res.body;
        });

        //Deleting products

        it("Should delete a product", async () => {
            const res = await request(app)
            .delete(`/api/v1/products/${testProduct.id}`)
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message", "Product deleted Successfully");
        });

        //Making sure that the product exists

        it("Should return an error if product does not exist", async () => {
            const res = await request(app)
            .delete(`/api/v1/products/${testProduct.id}`)
            .set("Authorization", `Bearer ${authToken}`);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("error", "Product not found");
        });
    });
});

