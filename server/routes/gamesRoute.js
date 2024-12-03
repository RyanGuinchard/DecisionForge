/* eslint-env node */
const express = require("express");
const router = express.Router();
const mongodbUtil = require("../services/mongodbUtil.js");

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

// Route to get a specific game by title
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

// Route to add a new game
router.post("/", async (req, res) => {
  try {
    const result = await mongodbUtil.insertOne("games", req.body);
    if (!result.insertedId) {
      throw new Error("Failed to insert game");
    }
    const newGame = await mongodbUtil.findOne("games", { _id: result.insertedId });
    res.status(201).json(newGame);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to add game");
  }
});

// Route to delete a specific game by title
router.delete("/:title", async (req, res) => {
  try {
    const title = new RegExp(`^${req.params.title}$`, "i");
    await mongodbUtil.deleteOne("games", { title: title });
    res.json({ message: "Game deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to delete game");
  }
});

// Route to update a specific game title
router.put("/:title", async (req, res) => {
  try {
    const oldTitle = new RegExp(`^${req.params.title}$`, "i");
    await mongodbUtil.updateOne("games", { title: oldTitle }, { $set: { title: req.body.title } });
    res.json({ message: "Game title updated" });
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to update game title");
  }
});

// Route to add a new category to a game
router.post("/:title/category", async (req, res) => {
  try {
    const title = new RegExp(`^${req.params.title}$`, "i");
    const game = await mongodbUtil.findOne("games", { title: title });
    if (!game) {
      res.status(404).send("Game not found");
      return;
    }
    game.choices.push(req.body);
    const result = await mongodbUtil.updateOne("games", { title: title }, { $set: { choices: game.choices } });
    res.json(result.value);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to add category");
  }
});

// Route to update a specific category within a game
router.put("/:title/category/:category", async (req, res) => {
  try {
    const title = new RegExp(`^${req.params.title}$`, "i");
    const game = await mongodbUtil.findOne("games", { title: title });
    if (!game) {
      res.status(404).send("Game not found");
      return;
    }

    const categoryIndex = game.choices.findIndex(choice => choice.category === req.params.category);
    if (categoryIndex === -1) {
      res.status(404).send("Category not found");
      return;
    }

    game.choices[categoryIndex].category = req.body.category || game.choices[categoryIndex].category;
    game.choices[categoryIndex].options = req.body.options || game.choices[categoryIndex].options;

    const result = await mongodbUtil.updateOne("games", { title: title }, { $set: { choices: game.choices } });
    res.json(result.value);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to update category");
  }
});

// Route to delete a specific category within a game
router.delete("/:title/category/:category", async (req, res) => {
  try {
    const title = new RegExp(`^${req.params.title}$`, "i");
    const game = await mongodbUtil.findOne("games", { title: title });
    if (!game) {
      res.status(404).send("Game not found");
      return;
    }

    game.choices = game.choices.filter(choice => choice.category !== req.params.category);

    const result = await mongodbUtil.updateOne("games", { title: title }, { $set: { choices: game.choices } });
    res.json(result.value);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to delete category");
  }
});

// Route to add a new option to a category within a game
router.post("/:title/category/:category/option", async (req, res) => {
  try {
    const title = new RegExp(`^${req.params.title}$`, "i");
    const game = await mongodbUtil.findOne("games", { title: title });
    if (!game) {
      res.status(404).send("Game not found");
      return;
    }

    const categoryIndex = game.choices.findIndex(choice => choice.category === req.params.category);
    if (categoryIndex === -1) {
      res.status(404).send("Category not found");
      return;
    }

    game.choices[categoryIndex].options.push(req.body.option);

    const result = await mongodbUtil.updateOne("games", { title: title }, { $set: { choices: game.choices } });
    res.json(result.value);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to add option");
  }
});

// Route to update a specific option within a category
router.put("/:title/category/:category/option/:option", async (req, res) => {
  try {
    const title = new RegExp(`^${req.params.title}$`, "i");
    const game = await mongodbUtil.findOne("games", { title: title });
    if (!game) {
      res.status(404).send("Game not found");
      return;
    }

    const categoryIndex = game.choices.findIndex(choice => choice.category === req.params.category);
    if (categoryIndex === -1) {
      res.status(404).send("Category not found");
      return;
    }

    const optionIndex = game.choices[categoryIndex].options.findIndex(option => option === req.params.option);
    if (optionIndex === -1) {
      res.status(404).send("Option not found");
      return;
    }

    game.choices[categoryIndex].options[optionIndex] = req.body.option || game.choices[categoryIndex].options[optionIndex];

    const result = await mongodbUtil.updateOne("games", { title: title }, { $set: { choices: game.choices } });
    res.json(result.value);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to update option");
  }
});

// Route to delete a specific option within a category
router.delete("/:title/category/:category/option/:option", async (req, res) => {
  try {
    const title = new RegExp(`^${req.params.title}$`, "i");
    const game = await mongodbUtil.findOne("games", { title: title });
    if (!game) {
      res.status(404).send("Game not found");
      return;
    }

    const categoryIndex = game.choices.findIndex(choice => choice.category === req.params.category);
    if (categoryIndex === -1) {
      res.status(404).send("Category not found");
      return;
    }

    game.choices[categoryIndex].options = game.choices[categoryIndex].options.filter(option => option !== req.params.option);

    const result = await mongodbUtil.updateOne("games", { title: title }, { $set: { choices: game.choices } });
    res.json(result.value);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while trying to delete option");
  }
});

module.exports = router;