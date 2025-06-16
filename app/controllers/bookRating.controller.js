const db = require("../models");
const bookRating = db.bookRatings;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  // Validate request
  if (req.body.rating === undefined) {
    const error = new Error("rating cannot be empty for book!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Ingredient
  const bookRatings = {
    rating: req.body.rating,
    userId: req.body.userId,
    review: req.body.review,
    bookId: req.body.bookId,
  };

  return bookRating
    .create(bookRatings)
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

exports.update = (req, res) => {
  const id = req.params.id;
  // Proceed with update if not exists
  bookRating
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
    });
};