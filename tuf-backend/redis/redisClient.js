const { createClient } = require("redis");

const client = createClient({
  password: "w3OSSwUUgvI8ckZJVi6iL1x7jtTCMoSF",
  socket: {
    host: "redis-16279.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 16279,
  },
});

module.exports = client;
