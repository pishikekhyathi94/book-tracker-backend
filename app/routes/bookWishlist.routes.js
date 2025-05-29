module.exports = (app) => {
  const Wishlist = require("../controllers/bookWishlist.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Recipe
  router.post(
    "/wishlist/book",
    [authenticateRoute],
    Wishlist.addBookToWishlist
  );
  app.use("/booklistapi", router);
};