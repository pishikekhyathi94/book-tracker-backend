const db = require("../models");
const Notification = db.notification;
const Op = db.Sequelize.Op;

exports.getNotifications = async (req, res) => {
  const userId = req.query.userId;
  const User = db.user;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }
  Notification.findAll({
    where: {
      createdAt: {
        [Op.gt]: user.createdAt,
      },
    },
    order: [["createdAt", "ASC"]],
  })
    .then(async (data) => {
      await User.update(
        { notification_viewed: true },
        { where: { id: userId } }
      );
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications.",
      });
    });
};
