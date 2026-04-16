const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Schema define
const Enquiry = mongoose.model("Enquiry", {
  name: String,
  phone: String
});

// ✅ POST API (save)
app.post("/enquiry", async (req, res) => {
  const data = new Enquiry(req.body);
  await data.save();

  res.send("Saved to Database ✅");
});

// ✅ GET test
app.get("/enquiry", (req, res) => {
  res.send("Enquiry API is working ✅");
});

// ✅ ADMIN (view data)
app.get("/admin", async (req, res) => {
  const data = await Enquiry.find();
  res.json(data);
});

// ✅ HOME
app.get("/", (req, res) => {
  res.send("SM AQUA API LIVE ✅");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started");
});
