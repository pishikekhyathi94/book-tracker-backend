module.exports = (app) => {
  const bookAuthor = require("../controllers/bookAuthor.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new book
  router.post("/author/create", [authenticateRoute], bookAuthor.create);

// Retrieve all book
  router.get("/authors/", bookAuthor.findAll);

  // Update an book with bookId
  router.put("/author/:id", [authenticateRoute], bookAuthor.update);

  // Delete an book with bookId
  router.delete("/author/:id", [authenticateRoute], bookAuthor.delete);  


  app.use("/booklistapi", router);
};
 