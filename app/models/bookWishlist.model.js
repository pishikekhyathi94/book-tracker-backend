module.exports = (sequelize, Sequelize) => {
  const bookWishlist = sequelize.define("bookWishlist", {});
  return bookWishlist;
};