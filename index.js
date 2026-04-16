const express = require("express");
const app = express();

app.use(express.json());

// enquiry API
app.post("/enquiry", (req, res) => {
  const { name, phone } = req.body;

  console.log("New Enquiry:", name, phone);

  res.send("Enquiry Received ✅");
});

// test route
app.get("/", (req, res) => {
  res.send("SM AQUA API LIVE ✅");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started");
});
app.get("/enquiry", (req, res) => {
  res.send("Enquiry API is working ✅");
});
