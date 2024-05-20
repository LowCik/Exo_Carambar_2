const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Joke = sequelize.define("Joke", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Joke;

//utilise Sequelize (initialisé dans config/database.js)
