// models/DiscountCharge.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // Import Sequelize instance

const DiscountCharge = sequelize.define('DiscountCharge', {
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
    coupon_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    bank_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    no_return_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    cod_charges: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    shipping_charges: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    packing_charges: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    handling_charges: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    net_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
    },
    gross_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'discounts_charges',
    timestamps: false, // Disable Sequelize's default timestamps, as we handle them manually
    indexes: [
        { fields: ['order_id'] },
        { fields: ['product_id'] },
    ],
});

// Define associations (relations)
DiscountCharge.associate = (models) => {
    // Each discount/charge is associated with an order
    DiscountCharge.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });

    // Each discount/charge is associated with a product
    DiscountCharge.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
};

module.exports = DiscountCharge;
