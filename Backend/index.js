const Hapi = require('hapi');

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
    console.log('Server started at:', server.info.uri);
};
startServer();

server.route({
    method: "GET",
    path: "/hello",
    handler: (req, res) => {
        return("hellow world!");
    }
});
