const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const UserRole = sequelize.define('UserRole', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'user_roles',
  timestamps: false
});
sequelize.sync({ force: true })
module.exports = UserRole;
