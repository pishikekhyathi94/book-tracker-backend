const db = require("../models");
const bookAuthor = db.bookAuthor;
const Op = db.Sequelize.Op;

// Create and Save a new Ingredient
exports.create = (req, res) => {
  // Validate request
  if (req.body.authorName === undefined) {
    const error = new Error("Name cannot be empty for author!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Ingredient
  const authorDetails = {
    authorName: req.body.authorName,
    userId: req.body.userId,
  };
  // Save Ingredient in the database
  bookAuthor
    .create(authorDetails)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the author.",
      });
    });
};

exports.findAll = (req, res) => {
  const userId = req.query.userId;

  bookAuthor
    .findAll({ where: { userId: userId }, order: [["createdAt", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving authors.",
      });
    });
};

// Update a Ingredient by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  bookAuthor
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Author details were updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Author with id=" + id,
      });
    });
};

// Delete a Ingredient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  bookAuthor
    .destroy({
      where: { id: id },
    })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Author was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Author with id=${id}. Maybe Author was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Author with id=" + id,
      });
    });
};