module.exports = (sequelize, Sequelize) => {
  const BookAuthorsBooks = sequelize.define(
    "BookAuthorsBooks",
    {
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return BookAuthorsBooks;
};
