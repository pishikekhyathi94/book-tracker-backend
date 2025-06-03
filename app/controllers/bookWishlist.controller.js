const db = require("../models");
const Wishlist = db.bookWishlist;
const Op = db.Sequelize.Op;
exports.addBookToWishlist = (req, res) => {
  if (req.body.bookId === undefined) {
    const error = new Error("bookId cannot be empty for wishlist!");
    error.statusCode = 400;
    throw error;
  }

  const bookWishlist = {
    bookId: req.body.bookId,
    userId: req.body.userId,
  };
  Wishlist.create(bookWishlist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the book Wishlist.",
      });
    });
};

exports.removeBookFromWishlist = (req, res) => {
  const id = req.params.id;
  Wishlist.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book was removed from wishlist successfully!",
        });
      } else {
        res.send({
          message: `Cannot remove Book with id=${id}. Maybe Book was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not remove Book with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const userId = req.query.userId;
  Wishlist.findAll({
    where: { userId: userId },
    include: [
      {
        model: db.book,
        as: "book",
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
      },
    ],
    order: [["createdAt", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Book for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Book for user with id=" + userId,
      });
    });
};
