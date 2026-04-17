const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔴 IMPORTANT: మీ MongoDB URL ఇక్కడ పెట్టండి
mongoose.connect("mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/test")
.then(() => console.log("DB Connected ✅"))
.catch(err => console.log("DB Error ❌", err));

// Schema
const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  machine: String,
  capacity: String
});

const Order = mongoose.model("Order", OrderSchema);

// Home
app.get("/", (req, res) => {
  res.send("SM Aqua Backend Running ✅");
});

// Save order
app.post("/order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "Order Saved ✅" });
  } catch (err) {
    res.status(500).json({ error: "Error saving order ❌" });
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Server start
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🚀");
});
