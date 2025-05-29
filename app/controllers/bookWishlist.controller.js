const db = require("../models");
const Wishlist = db.bookWishlist;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.addBookToWishlist = (req, res) => {
  // Validate request
  if (req.body.bookId === undefined) {
    const error = new Error("bookId cannot be empty for wishlist!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Recipe
  const bookWishlist = {
    bookId: req.body.bookId,
    userId: req.body.userId,
  };
  // Save Recipe in the database
  Wishlist.create(bookWishlist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Wishlist.",
      });
    });
};
