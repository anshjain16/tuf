const dbclient = require("../dbconfig/database");
const redisClient = require("../redis/redisClient");

redisClient.connect();
redisClient.on("connect", (err) => {
  if (err) console.log(err);
  else console.log("connected to redis server");
});
const getSubmissions = async (req, res) => {
  try {
    const cachedData = await redisClient.get("all_submissions");
    if (cachedData) {
      console.log("cache hit");
      res.status(200).json(JSON.parse(cachedData));
    } else {
      const query_res = await dbclient.query("SELECT * FROM CodeSubmission");
      console.log(query_res.rows);
      await redisClient.set("all_submissions", JSON.stringify(query_res.rows));
      res.status(200).json(query_res.rows);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const createSubmission = async (req, res) => {
  try {
    const { username, source_code, stdin, language, output, code_snippet } =
      req.body;
    const query_res = await dbclient.query(
      "INSERT INTO CodeSubmission(username, source_code, stdin, language, output, code_snippet) VALUES($1, $2, $3, $4, $5, $6)",
      [username, source_code, stdin, language, output, code_snippet]
    );

    const queryRes2 = await dbclient.query("SELECT * FROM CodeSubmission");
    await redisClient.set("all_submissions", JSON.stringify(queryRes2.rows));
    console.log(query_res.rows);
    res.status(200).send("submission created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getSubmissions, createSubmission };
