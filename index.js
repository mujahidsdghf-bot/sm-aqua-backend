const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Error వచ్చినా ఆగిపోకుండా)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected ✅"))
    .catch(err => console.log("DB Connection Wait... ⏳"));

const Order = mongoose.model("Order", new mongoose.Schema({
    name: String, phone: String, machine: String, capacity: String, date: { type: Date, default: Date.now }
}));

app.get("/", (req, res) => res.send("SM Aqua Backend is Active 🚀"));

app.post("/order", async (req, res) => {
    try {
        const { name, phone, machine, capacity } = req.body;

        // డేటాబేస్ లో సేవ్ చేయడానికి ప్రయత్నం (Background లో జరుగుతుంది)
        const newOrder = new Order({ name, phone, machine, capacity });
        newOrder.save().catch(e => console.log("DB Save Error, but continuing..."));

        // వాట్సాప్ మెసేజ్ (దీని వల్ల సర్వర్ ఆగకూడదు)
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        client.messages.create({
            from: "whatsapp:+14155238886",
            to: "whatsapp:+919177411712",
            body: `🚀 New Order: ${name}, ${phone}, ${machine}`
        }).catch(e => console.log("Twilio Error"));

        // కస్టమర్ కి వెంటనే సక్సెస్ మెసేజ్ పంపడం
        return res.status(200).json({ success: true, message: "Order Received!" });

    } catch (error) {
        return res.status(200).json({ success: true, message: "Order Processed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server Running"));
