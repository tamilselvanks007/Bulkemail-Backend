import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // load .env file

const app = express(); // create express app

const PORT = process.env.PORT || 4000; // Port number

app.use(express.json()); // Middleware

app.use(cors()); // Middleware

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Create a transporter
var sender = nodemailer.createTransport({
  service: "gmail", // Gmail service
  // Authentication
  auth: {
    user: process.env.email, // Email
    pass: process.env.password, // Password
  },
});

//GET METHOD
// home page
app.get("/", function (req, res) {
  res.send("Welcome to Bulk Email Service📧🎉");
});

// POST METHOD
// create a route for sending emails
app.post("/send", function (req, res) {
  const { to, subject, message } = req.body;
  var composemail = {
    from: process.env.from, // Sender address
    to: to,
    subject: subject,
    text: message,
  };

  // Send the email
  sender.sendMail(composemail, function (error, info) {
    if (error) {
      console.log(error);
      res.status(404).send("server busy");
    } else {
      console.log("success " + info.response);
      res.send({
        to: to,
        subject: subject,
        message: message,
      });
    }
  });
});

// listen to port
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
