/* eslint-env node */
require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

//Middleware to parse JSON
app.use(express.json());

