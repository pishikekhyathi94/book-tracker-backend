module.exports = (sequelize, Sequelize) => {
  const bookAuthor = sequelize.define("bookAuthor", {
    authorName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    booksPublished:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    description:{
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return bookAuthor;
};
