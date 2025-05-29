module.exports = (app) => {
  const Wishlist = require("../controllers/bookWishlist.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  router.post(
    "/wishlist/book",
    [authenticateRoute],
    Wishlist.addBookToWishlist
  );
router.delete(
    "/wishlist/remove/book/:id",
    [authenticateRoute],
    Wishlist.removeBookFromWishlist
  );
  
  router.get("/wishlist", Wishlist.findAll);


  app.use("/booklistapi", router);
};