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
    booksPublished:req.body.booksPublished,
          description:req.body.description,
  };
  // Check if author already exists
  bookAuthor
    .findOne({
      where: {
        authorName: req.body.authorName,
      },
    })
    .then((existingAuthor) => {
      if (existingAuthor) {
        return res.status(400).send({ message: "Author already exists" });
      }
      // Save Ingredient in the database
      return bookAuthor
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
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while checking author.",
      });
    });
  return;
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
  // Check if the new authorName already exists (excluding current author)
  if (req.body.authorName) {
    bookAuthor
      .findOne({
        where: {
          authorName: req.body.authorName,
          
          id: { [Op.ne]: id },
        },
      })
      .then((existingAuthor) => {
        if (existingAuthor) {
          return res.status(400).send({ message: "Author already exists" });
        }
        // Proceed with update if not exists
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
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error checking existing author.",
        });
      });
  } else {
    // No authorName change, just update
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
  }
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