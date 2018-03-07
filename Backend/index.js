const Hapi = require('hapi');
const mysql = require('mysql');
const Joi = require('joi');

//create a server
const server = new Hapi.Server()
server.connection({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true
    }
});

//start server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

//create connection to database
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "gst_billing_app"
});

//connect to database
db.connect((error) => {
    if (error) {
        console.log("Error connecting to mysql database");
        process.exit(1);
    }
    console.log("Connected to mysql.");
});

//Check for valid connection details
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

//creating route for testing
server.route({
    method: "GET",
    path: "/welcome",
    handler: (req, res) => {
        return ("Welcome to MySql database");
    }
});

//creating GET route for the query of product using product_code
server.route({
    method: "GET",
    path: "/code/{product_code}",
    handler: (request, h) => {
        var product_c;
        const product_code = request.params.product_code;
        db.query("SELECT * FROM `products` WHERE `product_code` = '" + product_code + "'", function (error, result, fields) {
            if (error) {
                console.log("Error while querying");
                throw error;
            }
            console.log("Result from query function", result);
            var product_c = JSON.stringify(result)
            h(product_c);
        });
    },
    //validations for params
    config: {
        validate: {
            params: {
                product_code: Joi.number().integer()
            }
        }
    }
});

//creating GET route for the query of product using product_name
server.route({
    method: "GET",
    path: "/name/{product_name}",
    handler: (request, h) => {
        var product_n;
        const product_name = request.params.product_name;
        db.query("SELECT * FROM `products` WHERE `product_name` = '" + product_name + "'", function (error, result, fields) {
            if (error) {
                console.log("Error while querying");
                throw error;
            }
            console.log("Result from query function", result);
            var product_n = JSON.stringify(result)
            h(product_n);
        });
        //validations for params
        config: {
            validate: {
                params: {
                    product_name: Joi.string()
                }
            }
        }
    }
});

//creating GET route for the query all products
server.route({
    method: "GET",
    path: "/products",
    handler: (request, h) => {
        var statement = "SELECT * FROM `products`";
        var products;
        db.query(statement, function (error, result, fields) {
            if (error) {
                console.log("Error while querying");
                throw error;
            }
            console.log("Result from query function", result);
            products = JSON.stringify(result);
            h(products);
        });
    }
});

//creating POST route to add product in database
server.route({
    method: "POST",
    path: "/product",
    handler: (request, h) => {
        const product_code = request.payload.product_code;
        const product_name = request.payload.product_name;
        const product_price = request.payload.product_price;
        const product_gst = request.payload.product_gst;
        var statement = "INSERT INTO `products` (`id`, `product_code`, `product_name`, `product_price`, `product_gst`) VALUES (NULL, '" + product_code + "', '" + product_name + "', '" + product_price + "', '" + product_gst + "')";
        db.query(statement, function (error, result, fields) {
            if (error) {
                console.log("Error while querying");
                throw error;
            }
            console.log("Result from query function", result);
            h(result);
        });
    },
    //validations for payload
    config: {
        validate: {
            payload: {
                product_name: Joi.string(),
                product_code: Joi.number().integer(),
                product_price: Joi.number().integer(),
                product_gst: Joi.number().integer()
            }
        }
    }
});

//creating POST route to update existing product in database
server.route({
    method: "POST",
    path: "/{product_code}",
    handler: (request, h) => {
        const product_code = request.params.product_code;
        const product_name = request.payload.product_name;
        const product_price = request.payload.product_price;
        const product_gst = request.payload.product_gst;
        var statement = "UPDATE `products` SET `product_name` = '" + product_name + "', `product_price` = '" + product_price + "', `product_gst` = '" + product_gst + "' WHERE `products`.`product_code` = '" + product_code + "'";
        db.query(statement, function (error, result, fields) {
            if (error) {
                console.log("Error while querying");
                throw error;
            }
            console.log("Result from query function", result);
            h(result);
        });
    },
    //validations for payload
    config: {
        validate: {
            payload: {
                product_name: Joi.string(),
                product_price: Joi.number().integer(),
                product_gst: Joi.number().integer()
            }
        }
    }
});
