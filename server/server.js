const {graphql_schema} = require("./graphql/graphql_schema");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
const app = express();
const bodyParser = require("body-parser")
const httpServer = http.createServer(app);
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

// mongo db connection
mongoose.connect(process.env.MONGO_DB).catch(console.error);
const database_connection = mongoose.connection;
database_connection.on("error", console.error.bind(console, "connection error: "));
database_connection.once("open", function () {
  console.log("MongoDB Connected successfully");
});

// middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// stripe payment
app.post("/payment", cors(), async (req, res) => {
  let {amount , id } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Service",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment)
    res.json({
      message: "Payment Successful",
      success: true
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: "Payment Failed",
      success: false
    })
  }
})

// serve up react
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// apollo graphql server
const server = new ApolloServer({
  schema: graphql_schema,
  context: async ({ req, connection }) => {
    if (connection) {
      return { req };
    }
    if (req) {
      return { req };
    }
  },
});

// start apollo subscription server
const startUp = async () => {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  server.installSubscriptionHandlers(httpServer);
};
startUp().catch(console.error);

// start apollo http server (query, mutation)
httpServer.listen({ port: process.env.PORT }, () => {
  console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`);
});