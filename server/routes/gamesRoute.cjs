/* eslint-env node */
const express = require("express");
const router = express.Router();
const mongodbUtil = require("../services/mongodbUtil.cjs");

// Route to get all games by title
router.get("/", async (req, res) => {
  try {
    const games = await mongodbUtil.findAll("games", {}, { title: 1 });
    res.json(games);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to get games");
  }
});

// Route to get a specific game
router.get('/:title', async (req, res) => {
  try {
    const title = new RegExp(`^${req.params.title}$`, "i");
    const game = await mongodbUtil.findOne("games", { title: title });
    if (!game) {
      res.status(404).send("Game not found");
      return;
    }
    res.json(game);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to get game");
  }
});

module.exports = router;