module.exports = (sequelize, Sequelize) => {
  const bookRatings = sequelize.define("bookRatings", {
    rating: {
      type: Sequelize.INTEGER,
    },
    review: {
      type: Sequelize.STRING,
    },
  });
  return bookRatings;
};
