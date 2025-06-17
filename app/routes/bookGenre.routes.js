module.exports = (app) => {
  const bookGenre = require("../controllers/bookGenre.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new book book for a book
  router.post("/genre/create", [authenticateRoute], bookGenre.create);
  router.get("/genre/", bookGenre.findAll);
  
  router.put("/genre/:id", [authenticateRoute], bookGenre.update);

  router.delete("/genre/:id", [authenticateRoute], bookGenre.delete);

  

  app.use("/booklistapi", router);
};
