module.exports = (sequelize, Sequelize) => {
  const bookGenre = sequelize.define("bookGenre", {
    bookGenre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description:{
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return bookGenre;
};
