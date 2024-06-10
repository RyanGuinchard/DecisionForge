/* eslint-env node */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT
const mongodbUtil = require("./services/mongodbUtil.js");

const app = express();

app.use(cors());


// Middleware to parse JSON
app.use(express.json());

// Routes
const gamesRoute = require("./routes/gamesRoute.js");
app.use("/games", gamesRoute);

// Warmup route to prevent cold starts
app.get("/warmup", (req, res) => {
  res.status(200).send("Warm-up successful");
});

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
