const { DataTypes } = require("sequelize");
const connection = require("../../db/connection");

const LocalTracks = connection.define(
  "LocalTracks",
  {
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    }    
  },
  { indexes: [{ unique: true, fields: ["filename"] }] }
);

module.exports = LocalTracks;
