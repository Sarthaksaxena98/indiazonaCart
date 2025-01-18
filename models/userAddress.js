const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const UserAddress = sequelize.define('UserAddress', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  manager_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users', 
      key: 'id'
    }
  },
  address: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  landmark: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  state_id: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  city_id: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  tableName: 'user_addresses',
  timestamps: false 
});

module.exports = UserAddress;
