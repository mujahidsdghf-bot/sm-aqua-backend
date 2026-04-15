const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// MongoDB CONNECT
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// MODEL
const Enquiry = require("./models/Enquiry");

// API
app.post("/enquiry", async (req, res) => {
  try {
    const data = new Enquiry(req.body);
    await data.save();
    res.send("Saved Successfully ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// HOME
app.get("/", (req, res) => {
  res.send("SM Aqua Backend Running ✅");
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
