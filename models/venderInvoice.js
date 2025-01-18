const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


const VendorInvoice = sequelize.define('VendorInvoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Commission', 'Closing Charges', 'Insurance Premium', 'Logistics Charges'),
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  invoice_number: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  commission: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  closing_charges: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  insurance_premium: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  logistics_charges: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  transaction_type: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  place_of_supply: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  gross_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  order_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'orders', // Reference to the 'orders' model
      key: 'id'
    },
    allowNull: true,
    onDelete: 'SET NULL', 
    onUpdate: 'CASCADE' 
  }
}, {
  tableName: 'vendor_invoices',
  timestamps: true, 
  createdAt: 'created_at', 
  updatedAt: 'updated_at' 
});

module.exports = VendorInvoice;
