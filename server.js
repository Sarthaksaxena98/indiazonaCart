const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');  // Import Sequelize instance

// Import all route files
const productRoutes = require('./routers/productRoutes');
const taxAmountRoutes = require('./routers/taxAmountRoutes');
const orderRoutes = require('./routers/orderRoutes');
const cartItemRoutes = require('./routers/cartItemRoutes');
const discountChargeRoutes = require('./routers/discountChargeRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Use routes for respective API endpoints
app.use('/api/products', productRoutes);
app.use('/api/taxes', taxAmountRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/discounts', discountChargeRoutes);

// Sync Sequelize models (this should be done only once on application startup)
sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.error('Error syncing database:', error);
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
