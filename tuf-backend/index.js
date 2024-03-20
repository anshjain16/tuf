const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbclient = require("./dbconfig/database");
const submissionsRouter = require("./router/submissions");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.json({ type: "application/vnd.api+json" }));
server.use(cors());

server.get("/", (req, res) => {
  res.send("Hello Striver");
});

server.use("/api/v1/submission", submissionsRouter);

const port = process.env.PORT || 8080;
server.listen(port, async () => {
  await dbclient.connect();
  console.log(`server is running on port ${port}`);
});
