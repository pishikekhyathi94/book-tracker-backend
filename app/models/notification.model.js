module.exports = (sequelize, Sequelize) => {
  const notification = sequelize.define("notification", {
    notification: {
      type: Sequelize.STRING,
    },
  });
  return notification;
};
