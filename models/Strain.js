const { INTEGER, STRING, BOOLEAN, DOUBLE } = require("sequelize");
const sequelize = require("../config/database");

const Strain = sequelize.define("Strain", {
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  strain: {
    type: STRING(255),
  },
  thc: {
    type: DOUBLE,
  },
  cbd: {
    type: DOUBLE,
  },
  cbg: {
    type: DOUBLE,
  },
  strainType: {
    type: STRING(50),
  },
  climate: {
    type: STRING(50),
  },
  difficulty: {
    type: STRING(50),
  },
  indoorYieldInGramsMax: {
    type: INTEGER,
  },
  outdoorYieldInGramsMax: {
    type: INTEGER,
  },
  floweringWeeksMin: {
    type: INTEGER,
  },
  floweringWeeksMax: {
    type: INTEGER,
  },
  heightInInchesMin: {
    type: INTEGER,
  },
  heightInInchesMax: {
    type: INTEGER,
  },
  goodEffects: {
    type: STRING(255),
  },
  sideEffects: {
    type: STRING(255),
  },
  imgThumb: {
    type: STRING(255),
  },
  imgAttribution: {
    type: STRING(255),
  },
  imgAttributionLink: {
    type: STRING(255),
  },
  imgCreativeCommons: {
    type: BOOLEAN,
  },
});

module.exports = Strain;
