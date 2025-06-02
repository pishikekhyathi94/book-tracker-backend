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

exports.findAll = (req, res) => {
  Book.findAll({
    include: [
      {
        model: db.bookAuthor,
        as: "bookAuthor",
      },
      {
        model: db.bookGenre,
        as: "bookGenre",
      },
    ],
    order: [["createdAt", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find  books.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Recipes.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Book.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Book with id=" + id,
      });
    });
};

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

exports.update = (req, res) => {
  const id = req.params.id;
  Book.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Book with id=" + id,
      });
    });
};

exports.searchBook = (req, res) => {
  bookname = req.query.bookName;
  var condition = bookname
    ? {
        bookName: {
          [Op.like]: `%${bookname}%`,
        },
      }
    : [];
  Book.findAll({
    where: condition,
    include: [
      {
        model: db.bookAuthor,
        as: "bookAuthor",
      },
      {
        model: db.bookGenre,
        as: "bookGenre",
      },
    ],
    order: [["createdAt", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Book with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Book with id=" + id,
      });
    });
};