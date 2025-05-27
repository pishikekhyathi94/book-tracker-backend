const db = require("../models");
const Book = db.book;
const RecipeStep = db.recipeStep;
const RecipeIngredient = db.recipeIngredient;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.bookName === undefined) {
    const error = new Error("Name cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.bookDescription === undefined) {
    const error = new Error("Description cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.bookCoverImage === undefined) {
    const error = new Error("Servings cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Recipe
  const bookDetails = {
    bookName: req.body.bookName,
    bookDescription: req.body.bookDescription,
    bookCoverImage: req.body.bookCoverImage,
    userId: req.body.userId,
    bookAuthorId: req.body.authorId,
    bookGenreId: req.body.genreId,
  };
  // Save Recipe in the database
  Book.create(bookDetails)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    });
};