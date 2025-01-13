// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');  // Import sequelize instance

const Order = sequelize.define('Order', {
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
    order_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    order_status: {
        type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Pending',
    },
    payment_status: {
        type: DataTypes.ENUM('Paid', 'Failed', 'Refunded', 'Pending'),
        allowNull: false,
        defaultValue: 'Pending',
    },
    payment_mode: {
        type: DataTypes.ENUM('Card', 'UPI', 'Wallet', 'COD'),
        allowNull: false,
    },
    discounts_charges_id: {
        type: DataTypes.INTEGER,
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
    tableName: 'orders',
    timestamps: false, // Disable Sequelize's default timestamps, since we're using custom ones
    indexes: [
        { fields: ['user_id'] },
        { fields: ['discounts_charges_id'] },
    ],
});

// Define associations (relations)
Order.associate = (models) => {
    // Each order belongs to one user
    Order.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    
    // Each order is associated with a discount/charge
    Order.belongsTo(models.DiscountCharge, { foreignKey: 'discounts_charges_id' });
};

module.exports = Order;
