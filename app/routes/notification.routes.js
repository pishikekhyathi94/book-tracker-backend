module.exports = (app) => {
  const Notification = require("../controllers/notification.controller");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  router.get("/notification", Notification.getNotifications);
  app.use("/booklistapi", router);
};
