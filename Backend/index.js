const Hapi = require('hapi');
const mysql = require('mysql');
const Joi = require('joi');

const server = new Hapi.Server()
server.connection({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "gst_billing_app"
});

db.connect((error) => {
    if (error) {
        console.log("Error connecting to mysql database");
        process.exit(1);
    }
    console.log("Connected to mysql.");
});
db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

server.route({
    method: "GET",
    path: "/welcome",
    handler: (req, res) => {
        return ("Welcome to MySql database");
    }
});

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
    config: {
        validate: {
            params: {
                product_code: Joi.number().integer()
            }
        }
    }
});
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
        config: {
            validate: {
                params: {
                    product_code: Joi.string()
                }
            }
        }
    }
});

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
server.route({
    method: "POST",
    path: "/product",
    handler: (request, h) => {
        const product_code = request.payload.product_code;
        const product_name = request.payload.product_name;
        const product_price = request.payload.product_price;
        const product_gst = request.payload.product_gst;
        var statement = "INSERT INTO `products` (`id`, `product_code`, `product_name`, `product_price`, `product_gst`) VALUES (NULL, '"+ product_code +"', '"+product_name +"', '"+ product_price +"', '"+ product_gst +"')";
        db.query(statement, function (error, result, fields) {
            if (error) {
                console.log("Error while querying");
                throw error;
            }
            console.log("Result from query function", result);
            h(result);
        });
    }
});

server.route({
    method: "POST",
    path: "/{product_code}",
    handler: (request, h) => {
        const product_code = request.params.product_code;
        const product_name = request.payload.product_name;
        const product_price = request.payload.product_price;
        const product_gst = request.payload.product_gst;
        var statement = "UPDATE `products` SET `product_name` = '"+ product_name +"', `product_price` = '" + product_price + "', `product_gst` = '" + product_gst + "' WHERE `products`.`product_code` = '"+ product_code +"'";
        db.query(statement, function (error, result, fields) {
            if (error) {
                console.log("Error while querying");
                throw error;
            }
            console.log("Result from query function", result);
            h(result);
        });
    }
});
