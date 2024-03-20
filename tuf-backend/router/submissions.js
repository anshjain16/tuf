const express = require("express");
const {
  createSubmission,
  getSubmissions,
} = require("../controller/submissions");
const router = express.Router();

// get all categories
router.get("/", getSubmissions);

// create a category
router.post("/", createSubmission);

module.exports = router;
