module.exports = (app) => {
  const bookRating = require("../controllers/bookRating.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");


  router.post("/rating", [authenticateRoute], bookRating.create);
  router.put("/rating/:id", [authenticateRoute], bookRating.update);
  
app.use("/booklistapi", router);
};