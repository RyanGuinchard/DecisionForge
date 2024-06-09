/* eslint-env node */
require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

//Middleware to parse JSON
app.use(express.json());

// TODO: Add route files

// TODO: Mount route files

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});