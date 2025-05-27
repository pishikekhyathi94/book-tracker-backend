module.exports = (app) => {
  const Book = require("../controllers/book.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/create/book", [authenticateRoute], Book.create);
  router.get("/all/books", Book.findAll);

  app.use("/booklistapi", router);
};