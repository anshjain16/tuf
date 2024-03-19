const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Hello Striver");
});

server.listen(8000, () => {
  console.log("server is running on port 8000");
});
