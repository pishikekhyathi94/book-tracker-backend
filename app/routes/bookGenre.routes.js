module.exports = (app) => {
  const bookGenre = require("../controllers/bookGenre.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Recipe Ingredient for a Recipe
  router.post("/genre/create", [authenticateRoute], bookGenre.create);
  router.put("/genre/:id", [authenticateRoute], bookGenre.update);

  // Retrieve all Recipe Ingredients
  router.get("/recipeIngredients/", RecipeIngredient.findAll);

  // Retrieve all Recipe Ingredients for a Recipe
  router.get(
    "/recipes/:recipeId/recipeIngredients/",
    RecipeIngredient.findAllForRecipe
  );

  // Retrieve all Recipe Ingredients for a Recipe Step and include the ingredients
  router.get(
    "/recipes/:recipeId/recipeSteps/:recipeStepId/recipeIngredientsWithIngredients/",
    RecipeIngredient.findAllForRecipeStepWithIngredients
  );

  // Retrieve a single Recipe Ingredient with id
  router.get(
    "/recipes/:recipeId/recipeIngredients/:id",
    RecipeIngredient.findOne
  );

  // Update a Recipe Ingredient with id
  router.put(
    "/recipes/:recipeId/recipeIngredients/:id",
    [authenticateRoute],
    RecipeIngredient.update
  );

  // Delete a Recipe Ingredient with id
  router.delete(
    "/recipes/:recipeId/recipeIngredients/:id",
    [authenticateRoute],
    RecipeIngredient.delete
  );

  // Delete all Recipe Ingredients
  router.delete(
    "/recipeIngredients/",
    [authenticateRoute],
    RecipeIngredient.deleteAll
  );

  app.use("/booklistapi", router);
};
