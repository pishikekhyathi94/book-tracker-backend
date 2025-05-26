module.exports = (app) => {
  const bookAuthor = require("../controllers/bookAuthor.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Ingredient
  router.post("/author/create", [authenticateRoute], bookAuthor.create);

// Retrieve all Ingredient
  router.get("/authors/", bookAuthor.findAll);

  // Update an Ingredient with ingredientId
  router.put("/author/:id", [authenticateRoute], bookAuthor.update);

  // Delete an Ingredient with ingredientId
  router.delete("/author/:id", [authenticateRoute], bookAuthor.delete);  

  // Create a new Ingredient
  router.delete("/ingredients/", [authenticateRoute], Ingredient.deleteAll);

  app.use("/booklistapi", router);
};
