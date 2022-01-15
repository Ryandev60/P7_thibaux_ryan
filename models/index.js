// Importation de db.config
const dbConfig = require("../config/db.config.js");

//Importation de sequelize
const Sequelize = require("sequelize");

// Connexion à la base de donnée ( donnée dans db.config )
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.comment = require("./comment.model.js")(sequelize, Sequelize);
db.post = require("./post.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;