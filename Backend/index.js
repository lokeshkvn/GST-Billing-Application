const Hapi = require('hapi');
const mysql = require('mysql');

const server = new Hapi.Server({
    host: "localhost",
    port: 3000,
    routes: {
        cors: true
    }
});

async function startServer() {
    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};
startServer();

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "gst_billing_app"
});

db.connect((error) => {
    if(error){
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
        return("Welcome to MySql database");
    }
});
