// models/TaxAmount.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const TaxAmount = sequelize.define('TaxAmount', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cgst_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    sgst_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    igst_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    transaction_type: {
        type: DataTypes.ENUM('Intra', 'Inter'),
        allowNull: false,
    },
    tax_amount_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'tax_amounts',
    timestamps: false, // Disable Sequelize's default timestamps, as we handle them manually
    indexes: [
        { fields: ['order_id'] },
        { fields: ['product_id'] },
    ],
});

module.exports = TaxAmount;
