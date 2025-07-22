const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct, getLowStockProducts } = require('../controllers/productController');
const { productValidationRules } = require('../middlewares/validators');
const { validationErrorHandler } = require('../middlewares/errorHandler');
const router = express.Router();

router.post('/', productValidationRules, validationErrorHandler, createProduct);
router.get('/', getProducts);
router.get('/low-stock', getLowStockProducts);
router.put('/:id', productValidationRules, validationErrorHandler, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
