const express = require("express");
const app = express();

app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("SM Aqua Backend Running ✅");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
