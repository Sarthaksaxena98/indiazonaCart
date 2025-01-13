// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');  // Import sequelize instance

const Product = sequelize.define('Product', {
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
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    packed_weight: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
    },
    package_length: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
    },
    package_breadth: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
    },
    package_height: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
    },
    volumetric_weight: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
    },
    chargeable_weight: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
    },
    is_made_in_india: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    is_hand_made: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    is_cash_on_delivery: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    is_customizable_product: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    delivery_by: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
    },
    return_policy_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    exchange_policy_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    hsn_code_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    gst: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null,
    },
    tag_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
    },
    iz_commission: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: null,
    },
    no_return_discount: {
        type: DataTypes.DOUBLE(8, 2),
        defaultValue: 0.00,
    },
    insurance_premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    variant_type: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    minimum_purchase_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    low_stock_quantity_warning: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    product_description: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    product_specification: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    thumbnail_image_url: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    pdf_specification_url: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    video_url: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
    },
    created_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_on: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
}, {
    tableName: 'products',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['user_id'] },
        { fields: ['hsn_code_id'] },
        { fields: ['brand_id'] },
    ],
});

module.exports = Product;
