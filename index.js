const http = require("http");

http.createServer((req, res) => {
  res.end("SM AQUA LIVE ✅");
}).listen(process.env.PORT || 10000, "0.0.0.0");

console.log("Server running");
