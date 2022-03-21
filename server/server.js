const {ApolloServer} = require("apollo-server-express");
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
const http = require('http');
const {application} = require("./graphql/schema");
const app = express();
const httpServer = http.createServer(app);
const qraphql_schema = application.createSchemaForApollo();
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB).catch(console.error);
const database_connection = mongoose.connection;

app.use(logger('dev'));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) =>
{res.sendFile(path.resolve(__dirname, 'build', 'index.html'))});

const server = new ApolloServer({
    schema: qraphql_schema,
    context: async({ req, connection}) => {
        if (connection) { return { } }
        if (req) { return { } }
    }
});

const startUp = async () => {
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    server.installSubscriptionHandlers(httpServer)
};
startUp().catch(console.error);

database_connection.on("error", console.error.bind(console, "connection error: "));
database_connection.once("open", function () { console.log("MongoDB Connected successfully") });

httpServer.listen({port: process.env.Port}, () => { console.log(`Apollo Server on http://localhost:4000/graphql`)});