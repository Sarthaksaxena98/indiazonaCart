const express = require('express');
const DiscountCharge = require('../models/discount');

const router = express.Router();

// Add Discount/Charge
router.post('/discount-charge', async (req, res) => {
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

        res.status(201).json(newDiscountCharge);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the discount/charge.' });
    }
});

module.exports = router;
