// --database client to identify the databse--
const { Client } = require("pg");

const database_url =
  "postgresql://ansh:IthevN_UK7J_ABpt79-7oQ@my-cluster-6144.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/demo?sslmode=verify-full";

const client = new Client(database_url);

module.exports = client;
