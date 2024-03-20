const dbclient = require("../dbconfig/database");

const getSubmissions = async (req, res) => {
  try {
    const query_res = await dbclient.query("SELECT * FROM CodeSubmission");
    console.log(query_res.rows);
    res.status(200).json(query_res.rows);
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

    console.log(query_res.rows);
    res.status(200).send("submission created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getSubmissions, createSubmission };
