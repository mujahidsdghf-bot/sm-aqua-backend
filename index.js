const http = require("http");

const server = http.createServer((req, res) => {
  res.end("SM AQUA SERVER WORKING ✅");
});

const PORT = process.env.PORT || 10000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});
