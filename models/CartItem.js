// models/CartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');  // Import sequelize instance

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    discounts_charges_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tax_amount_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Purchased', 'Cancelled'),
        allowNull: true,
        defaultValue: 'Pending',
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
    tableName: 'cart_items',
    timestamps: false, // Disable Sequelize's default timestamps, as we handle them manually
    indexes: [
        { fields: ['user_id'] },
        { fields: ['product_id'] },
        { fields: ['discounts_charges_id'] },
        { fields: ['tax_amount_id'] },
    ],
});

// Define associations (relations)
CartItem.associate = (models) => {
    // Each cart item belongs to a user
    CartItem.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    
    // Each cart item is associated with a product
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

    // Each cart item is associated with discounts/charges
    CartItem.belongsTo(models.DiscountCharge, { foreignKey: 'discounts_charges_id' });

    // Each cart item is associated with tax amounts
    CartItem.belongsTo(models.TaxAmount, { foreignKey: 'tax_amount_id' });
};

module.exports = CartItem;
