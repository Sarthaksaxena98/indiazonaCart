const CartItem = require('../models/CartItem');
const DiscountCharge = require('../models/discount');
const Order = require('../models/Order');
const ProductOrderInvoice = require('../models/productOrderInvoice'); 
const Product = require('../models/product');
const TaxAmount = require('../models/taxAmount');
const UserAddress = require('../models/userAddress'); 
const User = require('../models/users'); 
const VendorInvoice = require('../models/venderInvoice');

class helperController {
    constructor() { }

    async getCartItem(req, res){
        const { user_id, product_id, quantity, discounts_charges_id, tax_amount_id, status } = req.body;

        try {
            // Create a new cart item
            const newCartItem = await CartItem.create({
                user_id,
                product_id,
                quantity,
                discounts_charges_id,
                tax_amount_id,
                status,  // Optional, defaults to 'Pending' if not provided
            });
            return {
                message: 'Cart item created successfully!',
                cartItem: newCartItem,
            }
        } catch (error) {
            throw error;
        }
    }


    async getDiscountCharges(req, res){
        const {
            order_id,
            product_id,
            coupon_discount,
            bank_discount,
            no_return_discount,
            cod_charges,
            shipping_charges,
            packing_charges,
            handling_charges,
            gross_amount,
        } = req.body;
        try {
            // Create the new discount/charge entry
            const newDiscountCharge = await DiscountCharge.create({
                order_id,
                product_id,
                coupon_discount,
                bank_discount,
                no_return_discount,
                cod_charges,
                shipping_charges,
                packing_charges,
                handling_charges,
                gross_amount,
            });
    
            // Calculate the net amount after applying the charges and discounts
            const netAmount = gross_amount - (
                coupon_discount + 
                bank_discount + 
                no_return_discount + 
                cod_charges + 
                shipping_charges + 
                packing_charges + 
                handling_charges
            );
            newDiscountCharge.net_amount = netAmount;
            console.log("newDiscountCharge--------",newDiscountCharge);
    
    
            // Save the updated net amount
            await newDiscountCharge.save();
            return newDiscountCharge;
            // res.status(201).json(newDiscountCharge);
        } catch (err) {
            throw err;
            // console.error(err);
            // res.status(500).json({ error: 'An error occurred while adding the discount/charge.' });
        }
    }

    async getorder(req, res){
        const {
            user_id,
            order_number,
            order_status,
            payment_status,
            payment_mode,
            discounts_charges_id,
        } = req.body;
    
        try {
            // Create a new order entry in the database
            const newOrder = await Order.create({
                user_id,
                order_number,
                order_status,
                payment_status,
                payment_mode,
                discounts_charges_id,
            });
            return newOrder;
            // Send the newly created order data back in the response
            // res.status(201).json(newOrder);
        } catch (err) {
            throw err;
            // console.error(err);
            // res.status(500).json({ error: 'An error occurred while creating the order.' });
        }
    }

    async getProductOrderInvoice(req, res){
        const { id } = req.params;

        try {
          const productOrderInvoice = await ProductOrderInvoice.findByPk(id);
      
          if (!productOrderInvoice) {
            return res.status(404).json({ message: 'Product order invoice not found' });
          }
          return productOrderInvoice;
        //   res.status(200).json(productOrderInvoice);
        } catch (error) {
            throw error;
        //   console.error('Error fetching product order invoice:', error);
        //   res.status(500).json({ message: 'Server error', error });
        }
    }

    async getProduct(req, res){
        try {
            const { user_id, item_id, product_name, brand_id, packed_weight, price, description } = req.body; // Complete the body destructuring
    
    
            const newProduct = await Product.create({
                user_id,  
                item_id, 
                product_name,  
                brand_id,  
                packed_weight,  
                price,
                description,
            });
            
            return newProduct;
            // res.status(201).json(newProduct);
        } catch (err) {
            console.error(err);
            throw err;
            // res.status(500).json({ error: 'An error occurred while adding the product.' });
        }
    }

    async getTaxAmount(req, res){
        const {
            order_id,
            product_id,
            cgst_amount,
            sgst_amount,
            igst_amount,
            transaction_type,
            tax_amount_id
        } = req.body;
    
        try {
            // Validate transaction_type (Intra/Inter)
            if (!['Intra', 'Inter'].includes(transaction_type)) {
                return res.status(400).json({ error: 'Invalid transaction type.' });
            }
    
            // Create a new TaxAmount entry
            const newTaxAmount = await TaxAmount.create({
                order_id,
                product_id,
                cgst_amount,
                sgst_amount,
                igst_amount,
                transaction_type,
                tax_amount_id,
            });
            return newTaxAmount;
            // res.status(201).json(newTaxAmount);
        } catch (err) {
            console.error(err);
            throw err;
            // res.status(500).json({ error: 'An error occurred while adding the tax amount.' });
        }
    }

    async getTaxAmounts(req, res){
        const { order_id, product_id } = req.query;

        try {
            const query = {};
            if (order_id) query.order_id = order_id;
            if (product_id) query.product_id = product_id;
    
            const taxAmounts = await TaxAmount.findAll({
                where: query,
            });
    
            return taxAmounts;
            // res.status(200).json(taxAmounts);
        } catch (err) {
            console.error(err);
            throw err;
            // res.status(500).json({ error: 'An error occurred while fetching the tax amounts.' });
        }
    }

    async getUserAddress(req, res){
        try {
            const userAddresses = await UserAddress.findAll();
            return userAddresses;
            // res.status(200).json(userAddresses);
          } catch (error) {
            console.error('Error fetching user addresses:', error);
            throw error;
            // res.status(500).json({ message: 'Server error', error });
          }
    }

    async getUserAddressData(req, res){
        const { id } = req.params; 

        try {
          const userAddress = await UserAddress.findByPk(id);
      
          if (!userAddress) {
            return res.status(404).json({ message: 'User address not found' });
          }
          return userAddress;
        //   res.status(200).json(userAddress);
        } catch (error) {
          console.error('Error fetching user address:', error);
          throw error;
        //   res.status(500).json({ message: 'Server error', error });
        }
    }

    async getAllUser(req, res){
        try {
            const users = await User.findAll();  
            return users;
            // res.status(200).json(users);  
          } catch (error) {
            console.error(error);
            throw error;
            // res.status(500).json({ message: 'An error occurred while fetching users' });
          }
    }

    async getUserData(req, res){
        try {
            const user = await User.findByPk(req.params.id);  
            
            if (!user) {
                throw {message: 'User not found'};
            //   return res.status(404).json({ message: 'User not found' });
            }
            return user;
            // res.status(200).json(user);  
          } catch (error) {
            console.error(error);
            throw error;
            // res.status(500).json({ message: 'An error occurred while fetching the user' });
          }
    }

    async getAllVendor(req, res){
        try {
            const vendorInvoices = await VendorInvoice.findAll();
            return vendorInvoices;
            // res.status(200).json(vendorInvoices);
          } catch (error) {
            console.error('Error fetching vendor invoices:', error);
            throw error;
            // res.status(500).json({ message: 'Server error', error });
          }
    }

    async getVendorData(req, res){
        const { id } = req.params;
  
        try {
          const vendorInvoice = await VendorInvoice.findByPk(id);
          if (!vendorInvoice) {
            return res.status(404).json({ message: 'Vendor invoice not found' });
          }
          res.status(200).json(vendorInvoice);
        } catch (error) {
          console.error('Error fetching vendor invoice:', error);
          res.status(500).json({ message: 'Server error', error });
        }
    }
}

module.exports = new helperController();