const db = require("../models");
const Book = db.book;
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
    isWishlisted: false,
    onlineBuyingLink: req.body.onlineBuyingLink,
    onlinePDFLink: req.body.onlinePDFLink,
    releaseDate: req.body.releaseDate,
  };
  // Save Recipe in the database
  Book.create(bookDetails)
    .then(async (data) => {
      // Update bridge tables with required data

      // Fetch author details and update BookAuthorsBooks table
      const author = await db.bookAuthor.findOne({
        where: { id: req.body.authorId },
      });

      await db.BookAuthorsBooks.create({
        authorId: author.id,
        authorName: author.authorName,
        bookId: data.id,
        bookTitle: data.bookName,
        description: data.bookDescription,
      });

      // Update BookGenreBooks bridge table with required data
      const genre = await db.bookGenre.findOne({
        where: { id: req.body.genreId },
      });

      await db.BookGenresBooks.create({
        genreId: genre.id,
        genreName: genre.bookGenre,
        bookId: data.id,
        bookTitle: data.bookName,
        description: data.bookDescription,
      });
      const user = await db.user.findOne({
        where: { id: req.body.userId },
      });

      await db.UserBooks.create({
        bookName: data.bookName,
        description: data.bookDescription,
        userEmail: user.email,
        imageUrl: data.imageUrl,
        userId: req.body.userId,
        bookId: data.id,
      });
      // Set authors

      await db.user.update({ notification_viewed: false }, { where: {} });
      await db.notification.create({
        notification: `New book create with book name as ${req.body.bookName}`,
      });
      res.send(data);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    });
};

exports.findAll = (req, res) => {
  let condition;
  if (req.query.userId) {
    condition = { userId: req.query.userId };
  } else {
    condition = {};
  }
  console.log("condition", condition);
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
      {
        model: db.bookRatings,
        as: "bookRatings",
      },
    ],
    order: [["createdAt", "ASC"]],
  })
    .then(async (data) => {
      console.log(data);
      if (data) {
        const updatedData = await Promise.all(
          data.map(async (item) => {
            let existsInWishlist = await db.bookWishlist.findOne({
              where: { bookId: item.id },
            });
            if (existsInWishlist) {
              item.isWishlisted = true;
              item.dataValues.wishlistId = existsInWishlist.id;
            }
            const userBook = await db.UserBooks.findOne({
              where: { bookId: item.id, userId: item.userId },
            });
            item.dataValues.bookStatus = userBook;
            return item;
          })
        );

        res.send(updatedData);
      } else {
        res.status(404).send({
          message: `Cannot find  books.`,
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send({
        message: err.message || "Error retrieving Published Recipes.",
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

exports.findOne = (req, res) => {
  let bookId = req.params.id;
  Book.findOne({
    where: { id: bookId },
    include: [
      {
        model: db.bookAuthor,
        as: "bookAuthor",
      },
      {
        model: db.bookGenre,
        as: "bookGenre",
      },
      {
        model: db.bookRatings,
        as: "bookRatings",
      },
    ],
    order: [["createdAt", "ASC"]],
  })
    .then(async (data) => {
      if (data) {
        const userBooks = await db.UserBooks.findOne({
          userId: data.userId,
          bookId: req.params.id,
        });
        console.log(userBooks);
        data.dataValues.bookStatus = userBooks;

        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find books.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published books.",
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
    .then(async (data) => {
      if (data) {
        const updatedData = await Promise.all(
          data.map(async (item) => {
            let existsInWishlist = await db.bookWishlist.findOne({
              where: { bookId: item.id },
            });
            if (existsInWishlist) {
              item.isWishlisted = true;
              item.dataValues.wishlistId = existsInWishlist.id;
            }
            return item;
          })
        );
        res.send(updatedData);
      } else {
        res.status(404).send({
          message: `Cannot find Recipe with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Recipe with id=" + id,
      });
    });
};

exports.findBookByTitle = (req, res) => {
  let title = req.query.title;
  Book.findOne({
    where: { bookName: title },
  })
    .then((data) => {
      if (data) {
        res
          .status(400)
          .json({ message: "book with same title already exists" });
      } else {
        res.status(200).send({
          message: `Cannot find books.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published books.",
      });
    });
};

exports.updateBookReading = (req, res) => {
  const bookId = req.body.bookId;
  const userId = req.body.userId;
  if ((req.query.type = "startreading")) {
    req.body.startedReadingTime = Date.now();
  }
  console.log("userId", userId);
  db.UserBooks.update(req.body, {
    where: { userId: userId, bookId: bookId },
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
      console.log(err);
      res.status(500).send({
        message: err.message || "Error updating Book with id=" + id,
      });
    });
};