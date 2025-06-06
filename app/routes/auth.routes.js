module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Login
  router.post("/signin", auth.signin);

  // Logout
  router.post("/logout", auth.logout);

  app.use("/booklistapi", router);
};
