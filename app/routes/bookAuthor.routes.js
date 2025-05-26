module.exports = (app) => {
  const bookAuthor = require("../controllers/bookAuthor.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Ingredient
  router.post("/author/create", [authenticateRoute], bookAuthor.create);

  // Retrieve all Ingredient
  router.get("/ingredients/", Ingredient.findAll);

  // Retrieve a single Ingredient with ingredientId
  router.get("/ingredients/:id", Ingredient.findOne);

  // Update an Ingredient with ingredientId
  router.put("/ingredients/:id", [authenticateRoute], Ingredient.update);

  // Delete an Ingredient with ingredientId
  router.delete("/ingredients/:id", [authenticateRoute], Ingredient.delete);

  // Create a new Ingredient
  router.delete("/ingredients/", [authenticateRoute], Ingredient.deleteAll);

  app.use("/booklistapi", router);
};
