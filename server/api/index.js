/* eslint-env node */
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT
const mongodbUtil = require("../services/mongodbUtil.cjs");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
const gamesRoute = require("../routes/gamesRoute.cjs");
app.use("/games", gamesRoute);

const startServer = async () => {
    try {
        await mongodbUtil.connect();
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (e) {
        console.error("Failed to connect to MongoDB", e);
        process.exit(1);
    }
};

startServer();

module.exports = app;
