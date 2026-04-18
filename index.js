const express = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");

// 🔑
const client = new twilio(
  "AC2f4c5f7922c852e68b8eeaac4f5dd03a",
  "2b6d6eed8daf347db44006f36571d7a8" 
);

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://mujahidsdghf_db_user:15243%40Smaqua@smaqua.bdu7rgi.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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

// Test route
app.get("/", (req, res) => {
  res.send("SM Aqua Backend Running ✅");
});

// ✅ ONLY ONE ORDER API
app.post("/order", async (req, res) => {
  try {
    const { name, phone, machine, capacity } = req.body;

    const newOrder = new Order({ name, phone, machine, capacity });
    await newOrder.save();

    // 📲 WhatsApp message
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919177411712", // 👉 మీ number (already correct)
      body: `🚀 New Order

Name: ${name}
Phone: ${phone}
Machine: ${machine}
Capacity: ${capacity}`
    });

    res.json({ message: "Order + WhatsApp Sent ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error ❌" });
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
