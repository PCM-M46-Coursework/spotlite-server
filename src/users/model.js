const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const attributes = {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	biography: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	profilePic: {
		type: DataTypes.BLOB("long"),
		allowNull: true,
	},
	userrole: {
		type: DataTypes.ENUM('admin', 'user'),
  		allowNull: false,
  		defaultValue: 'user',
	},
};

const User = connection.define("User", attributes);
module.exports = User;
