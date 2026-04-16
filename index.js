const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Schema
const Enquiry = mongoose.model("Enquiry", {
  name: String,
  phone: String
});

// ✅ Save enquiry
app.post("/enquiry", async (req, res) => {
  const data = new Enquiry(req.body);
  await data.save();
  res.send("Saved to Database ✅");
});

// ✅ Admin view
app.get("/admin", async (req, res) => {
  const data = await Enquiry.find();
  res.json(data);
});

// ✅ Home
app.get("/", (req, res) => {
  res.send("SM AQUA API LIVE ✅");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started");
});
