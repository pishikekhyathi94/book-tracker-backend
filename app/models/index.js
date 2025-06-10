const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bookAuthor = require("./bookAuthor.model.js")(sequelize, Sequelize);
db.book = require("./book.model.js")(sequelize, Sequelize);
db.bookGenre = require("./bookGenre.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.bookWishlist = require("./bookWishlist.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for recipe
db.user.hasMany(
  db.bookAuthor,
  { as: "bookAuthor" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.bookAuthor.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// foreign key for recipeStep
db.user.hasMany(
  db.bookGenre,
  { as: "bookGenre" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.bookGenre.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.bookAuthor.hasMany(
  db.book,
  { as: "book" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.book.belongsTo(
  db.bookAuthor,
  { as: "bookAuthor" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

db.bookGenre.hasMany(
  db.book,
  { as: "book" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.book.belongsTo(
  db.bookGenre,
  { as: "bookGenre" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.book,
  { as: "book" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.book.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.bookWishlist,
  { as: "bookWishlist" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.bookWishlist.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.book.hasMany(
  db.bookWishlist,
  { as: "bookWishlist" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.bookWishlist.belongsTo(
  db.book,
  { as: "book" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

db.book.belongsToMany(db.bookAuthor, {
  through: "BookAuthorsBooks",
  as: "authors",
  foreignKey: "bookId",
  otherKey: "authorId",
});
db.bookAuthor.belongsToMany(db.book, {
  through: "BookAuthorsBooks",
  as: "books",
  foreignKey: "authorId",
  otherKey: "bookId",
});

db.book.belongsToMany(db.bookGenre, {
  through: "BookGenresBooks",
  as: "genres",
  foreignKey: "bookId",
  otherKey: "genreId",
});
db.bookGenre.belongsToMany(db.book, {
  through: "BookGenresBooks",
  as: "books",
  foreignKey: "genreId",
  otherKey: "bookId",
});
db.user.belongsToMany(db.book, {
  through: "UserBooks",
  as: "books",
  foreignKey: "userId",
  otherKey: "bookId",
});
db.book.belongsToMany(db.user, {
  through: "UserBooks",
  as: "users",
  foreignKey: "bookId",
  otherKey: "userId",
});
module.exports = db;
