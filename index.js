const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("SM AQUA WORKING ✅");
});

app.listen(3000, () => {
  console.log("Server started");
});
