const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect("YOUR_MONGODB_URL")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// Schema
const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  machine: String,
  capacity: String
});

const Order = mongoose.model("Order", OrderSchema);

// Routes
app.get("/", (req, res) => {
  res.send("SM Aqua Backend Running ✅");
});

// Save order
app.post("/order", async (req, res) => {
  const data = req.body;

  const newOrder = new Order(data);
  await newOrder.save();

  res.json({ message: "Order Saved ✅" });
});

// Get orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.listen(process.env.PORT || 3000);
