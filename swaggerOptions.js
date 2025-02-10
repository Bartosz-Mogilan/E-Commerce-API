const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce API",
            version: "1.0.0",
            description:"A E-Commerce API built with Express and PostgreSQL",
        },
        servers: [
            {
            url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js", "./controllers/*.js"],
};

export default swaggerOptions;