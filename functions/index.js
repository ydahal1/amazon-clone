const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  `sk_test_51ILu95BC0nVFpmbHCvIdDIotDAWFAQywflxw7xpIJYr61GLtmc5MD1dUoLQjkHSiu6EgBxCAwvM0Ju7x6JFZTAsw0031xxasKj`
);
//API
//App config
const app = express();
//Middlewares
app.use(cors());
app.use(express.json());

//API routes
app.get("/", (request, response) => {
  response.status(200).send("hello world");
});

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment req received for ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd"
  });
  response.status(201).send({
    // clientSecret: paymentIntent.clientSecret

    clientSecret: paymentIntent
  });
});
//Listem
exports.api = functions.https.onRequest(app);
