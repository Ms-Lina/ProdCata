require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
// const authRoutes = require('./src/routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// const swaggerApp = require('./src/app');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
