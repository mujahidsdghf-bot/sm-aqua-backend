const express = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Twilio Client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://mujahidsdghf_db_user:15243%40Smaqua@smaqua.bdu7rgi.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.log("DB Error ❌", err));

const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  machine: String,
  capacity: String,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

app.get("/", (req, res) => {
  res.send("SM Aqua Backend Live 🚀");
});

app.post("/order", async (req, res) => {
  try {
    const { name, phone, machine, capacity } = req.body;

    // 1. డేటాబేస్ లో సేవ్ చేయడం
    const newOrder = new Order({ name, phone, machine, capacity });
    await newOrder.save();

    // 2. వాట్సాప్ మెసేజ్ పంపడం (దీనిని try-catch లో ఉంచాము)
    try {
      await client.messages.create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919177411712", 
        body: `🚀 *New SM Aqua Order*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💧 Machine: ${machine}\n📦 Capacity: ${capacity}`
      });
      console.log("WhatsApp Sent ✅");
    } catch (whatsappError) {
      console.log("WhatsApp Error (But Order Saved):", whatsappError.message);
      // మెసేజ్ వెళ్లకపోయినా పర్వాలేదు, మనం కింద సక్సెస్ రిスポన్స్ ఇస్తాము
    }

    res.json({ success: true, message: "Order Received ✅" });

  } catch (err) {
    console.error("Main Error:", err);
    res.status(500).json({ success: false, error: "Server Error ❌" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
