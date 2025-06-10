module.exports = (app) => {
  const Recommendation = require("../controllers/bookRecommendation.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.get(
    "/books/recommendation",
    [authenticateRoute],
    Recommendation.get_recommendations
  );

  app.use("/booklistapi", router);
};
