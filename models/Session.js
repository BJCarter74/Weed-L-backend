const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Session = sequelize.define("Session", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  consumptionMethods: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

Session.belongsTo(User);
User.hasMany(Session);

module.exports = Session;
