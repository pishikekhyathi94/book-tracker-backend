module.exports = (app) => {
  const Book = require("../controllers/book.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/create/book", [authenticateRoute], Book.create);
  router.get("/all/books", Book.findAll);
  router.delete("/delete/book/:id", [authenticateRoute], Book.delete);
  router.get("/book/:id", Book.findOne);
  router.put("/update/book/:id", [authenticateRoute], Book.update);
  router.get("/search/books", Book.searchBook);
  router.get("/title/book", Book.findBookByTitle);

  app.use("/booklistapi", router);
};