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
    isWishlisted: {
      type: Sequelize.BOOLEAN,
    },
    onlineBuyingLink: {
      type: Sequelize.STRING,
    },
    onlinePDFLink: {
      type: Sequelize.STRING,
    },
  });
  return Book;
};
