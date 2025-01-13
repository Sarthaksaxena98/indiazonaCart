const express = require('express');
const TaxAmount = require('../models/taxAmount');

const router = express.Router();

// Add Tax Amount
router.post('/tax-amount', async (req, res) => {
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

        res.status(201).json(newTaxAmount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the tax amount.' });
    }
});

router.get('/tax-amounts', async (req, res) => {
    const { order_id, product_id } = req.query;

    try {
        const query = {};
        if (order_id) query.order_id = order_id;
        if (product_id) query.product_id = product_id;

        const taxAmounts = await TaxAmount.findAll({
            where: query,
        });

        res.status(200).json(taxAmounts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the tax amounts.' });
    }
});

module.exports = router;
