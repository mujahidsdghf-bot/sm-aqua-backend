const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// MongoDB Schema
const Enquiry = mongoose.model("Enquiry", {
  name: String,
  phone: String,
  message: String
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API
app.post("/enquiry", async (req, res) => {
  const data = new Enquiry(req.body);
  await data.save();
  res.send("Saved Successfully ✅");
});

app.get("/", (req, res) => {
  res.send("RO API WORKING ✅");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started");
});
