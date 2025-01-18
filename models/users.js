// User.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/database');


class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    secure_id : {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: true,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    referral_code: {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    email_verify_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reset_token: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
    reset_token_expiry: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
    is_phone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        const rawDate = this.getDataValue('created_at');
        if (!rawDate) return null;
      
        return new Date(rawDate).toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(/\//g, '-').replace(',', '').replace(/(\d{2})-(\d{2})-(\d{4})/, '$2-$1-$3');
      }
      
      
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = User;
