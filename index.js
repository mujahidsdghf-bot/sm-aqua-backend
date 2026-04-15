const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("SM AQUA BACKEND WORKING SUCCESSFULLY ✅");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("SERVER STARTED SUCCESSFULLY");
});
