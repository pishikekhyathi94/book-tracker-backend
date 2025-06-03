const db = require("../models");
const bookGenre = db.bookGenre;
const Op = db.Sequelize.Op;
// Create and Save a new RecipeIngredient
exports.create = (req, res) => {
  // Validate request
  if (req.body.bookGenre === undefined) {
    return res.status(400).send("bookGenre cannot be empty");
  }

  // Create a RecipeIngredient
  const bookGenreDetails = {
    bookGenre: req.body.bookGenre,
    userId: req.body.userId,
  };
  // Save bookGenreDetails in the database
  bookGenre
    .findOne({
      where: { bookGenre: req.body.bookGenre },
    })
    .then((existingGenre) => {
      if (existingGenre) {
        return res.status(400).send({ message: "Genre already exists." });
      }
      return bookGenre.create(bookGenreDetails);
    })
    .then((data) => {
      if (data) res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the bookGenreDetails.",
      });
    });
};

// Retrieve all RecipeIngredients from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;

  bookGenre
    .findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bookGenre.",
      });
    });
};

exports.findAllForRecipe = (req, res) => {
  const recipeId = req.params.recipeId;
  RecipeIngredient.findAll({
    where: { recipeId: recipeId },
    include: [
      {
        model: Ingredient,
        as: "ingredient",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving recipeIngredients for a recipe.",
      });
    });
};

// Find all RecipeIngredients for a recipe step and include the ingredients
exports.findAllForRecipeStepWithIngredients = (req, res) => {
  const recipeStepId = req.params.recipeStepId;
  RecipeIngredient.findAll({
    where: { recipeStepId: recipeStepId },
    include: [
      {
        model: Ingredient,
        as: "ingredient",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving recipeIngredients for a recipe step.",
      });
    });
};

// Find a single RecipeIngredient with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  RecipeIngredient.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving RecipeIngredient with id=" + id,
      });
    });
};

// Update a RecipeIngredient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Check if the new bookGenre already exists for the user (excluding current record)
  bookGenre
    .findOne({
      where: {
        bookGenre: req.body.bookGenre,
        id: { [Op.ne]: id },
      },
    })
    .then((existingGenre) => {
      if (existingGenre) {
        return res.status(400).send({ message: "Genre already exists." });
      }
      return bookGenre.update(req.body, { where: { id: id } });
    })
    .then((result) => {
      // result is [numberOfAffectedRows] if update was called
      return res
        .status(200)
        .json({ message: "book genre updated successfully" });
      // else: response already sent (genre exists)
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error updating bookGenre with id=" + id,
      });
    });
};

// Delete a RecipeIngredient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  bookGenre
    .destroy({
      where: { id: id },
    })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "bookGenre was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete bookGenre with id=${id}. Maybe bookGenre was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete bookGenre with id=" + id,
      });
    });
};

// Delete all RecipeIngredients from the database.
exports.deleteAll = (req, res) => {
  RecipeIngredient.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} RecipeIngredients were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all recipeIngredients.",
      });
    });
};
