const express = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");
const cors = require("cors");
require("dotenv").config();

const app = express();

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors()); // ఇది లేకపోతే ఫ్రంటెండ్ నుండి డేటా రాదు

// --- TWILIO CONFIGURATION ---
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// --- MONGODB CONNECTION ---
const mongoURI = process.env.MONGO_URI || "mongodb+srv://mujahidsdghf_db_user:15243%40Smaqua@smaqua.bdu7rgi.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Connection Error ❌:", err));

// --- DATABASE SCHEMA ---
const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  machine: String,
  capacity: String,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

// --- ROUTES ---

// 1. Home Route (చెక్ చేయడానికి)
app.get("/", (req, res) => {
  res.send("SM Aqua API is Running... 🚀");
});

// 2. Order Submission API
app.post("/order", async (req, res) => {
  try {
    const { name, phone, machine, capacity } = req.body;

    // డేటాబేస్‌లో సేవ్ చేయడం
    const newOrder = new Order({ name, phone, machine, capacity });
    await newOrder.save();

    // వాట్సాప్ మెసేజ్ పంపడం
    await client.messages.create({
      from: "whatsapp:+14155238886", // ట్విలియో సాండ్‌బాక్స్ నంబర్
      to: "whatsapp:+919177411712",   // మీ వాట్సాప్ నంబర్
      body: `🚀 *New SM Aqua Order*\n\n👤 పేరు: ${name}\n📞 ఫోన్: ${phone}\n💧 మెషిన్: ${machine}\n📦 కెపాసిటీ: ${capacity}`
    });

    res.status(200).json({ success: true, message: "Order & WhatsApp Sent! ✅" });

  } catch (err) {
    console.error("Error Detail:", err);
    res.status(500).json({ success: false, error: "Internal Server Error ❌" });
  }
});

// 3. All Orders (అడ్మిన్ కోసం)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🚀`);
});
