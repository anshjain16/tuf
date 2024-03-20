const express = require("express");
const dbclient = require("./dbconfig/database");
const submissionsRouter = require("./router/submissions");
const server = express();

server.use(express.json());
server.use(express.json({ type: "application/vnd.api+json" }));
server.get("/", (req, res) => {
  res.send("Hello Striver");
});

server.use("/api/v1/submission", submissionsRouter);

server.listen(8000, async () => {
  await dbclient.connect();
  console.log("server is running on port 8000");
});
