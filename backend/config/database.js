const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

//exporte pour utilisation plus tard.
module.exports = sequelize;

//Configure Sequelize avec SQLite , enregistre les donnée dans '.database.sqlite'
