const db = require("../models");
const bookGenre = db.bookGenre;
const Op = db.Sequelize.Op;
// Create and Save a new RecipeIngredient
exports.create = (req, res) => {
  // Validate request
  if (req.body.bookGenre === undefined) {
    const error = new Error("bookGenre cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  // Create a RecipeIngredient
  const bookGenreDetails = {
    bookGenre: req.body.bookGenre,
    description:req.body.description,
    userId: req.body.userId,
  };
  // Save bookGenreDetails in the database
  bookGenre
    .create(bookGenreDetails)
    .then((data) => {
      res.send(data);
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

  bookGenre
    .update(req.body, {
      where: { id: id },
    })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "bookGenre was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update bookGenre with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating bookGenre with id=" + id,
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
