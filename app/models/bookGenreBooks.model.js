module.exports = (sequelize, Sequelize) => {
  const BookGenresBooks = sequelize.define(
    "BookGenresBooks",
    {
      bookTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      genreName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return BookGenresBooks;
};
