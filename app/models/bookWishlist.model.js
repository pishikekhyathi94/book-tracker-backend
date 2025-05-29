module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    bookName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bookDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bookCoverImage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Book;
};
