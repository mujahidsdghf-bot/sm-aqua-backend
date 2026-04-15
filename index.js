const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Enquiry = require("./models/Enquiry");
const app = express();

app.use(express.json());
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongodb+srv://mujahidsdghf_db_user:<db_password>@smaqua.bdu7rgi.mongodb.net/?appName=SMAQUA
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("SM Aqua Backend Running ✅");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started");
});
