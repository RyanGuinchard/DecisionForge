/* eslint-env node */
require("dotenv").config();

const express = require("express");
const mongodbUtil = require("./services/mongodbUtil");

const app = express();

//Middleware to parse JSON
app.use(express.json());

// TODO: Add route files
const gamesRoute = require("./routes/gamesRoute");

// TODO: Mount route files
app.use("/games", gamesRoute);

// Start server
const port = process.env.PORT || 3000;

mongodbUtil.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((e) => {
        console.error('Failed to connect to mongodb', e);
        process.exit(1);
    });