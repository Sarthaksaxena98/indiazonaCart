const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors module
const sequelize = require('./utils/database');  // Import Sequelize instance

// Import all route files
const productRoutes = require('./routers/productRoutes');
const taxAmountRoutes = require('./routers/taxAmountRoutes');
const orderRoutes = require('./routers/orderRoutes');
const cartItemRoutes = require('./routers/cartItemRoutes');
const discountChargeRoutes = require('./routers/discountChargeRoutes');
const vendorInvoiceRoutes = require('./routers/venderRouter');
const productOrderInvoiceRoutes = require('./routers/productOrderInvoiceRouter'); 
const userAddressRouter = require('./routers/userAddressRouter'); 
const userRoutes = require('./routers/userRouter');  




const app = express();

app.use(cors());  


app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/taxes', taxAmountRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/discounts', discountChargeRoutes);
app.use('/api/invoice', vendorInvoiceRoutes);
app.use('/api/invoices', productOrderInvoiceRoutes);
app.use('/api/userAddress', userAddressRouter);
app.use('/api/users', userRoutes);





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
