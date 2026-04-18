const twilio = require("twilio");

const client = new twilio("YOUR_SID", "YOUR_TOKEN");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ⚠️ TRY/CATCH safe connection
mongoose.connect("YOUR_URL", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("DB Connected ✅"))
.catch(err => {
  console.log("DB Error ❌", err);
});

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
app.post("/order", async (req, res) => {
  try {
    const { name, phone, machine, capacity } = req.body;

    const newOrder = new Order({ name, phone, machine, capacity });
    await newOrder.save();

    // WhatsApp message
    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919177411712", //
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
app.post("/order", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "Order Saved ✅" });
  } catch (err) {
    res.status(500).json({ error: "Save failed ❌" });
  }
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🚀");
});
