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
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.recipeStep = require("./recipeStep.model.js")(sequelize, Sequelize);
db.bookGenre = require("./bookGenre.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

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
);;

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


module.exports = db;
