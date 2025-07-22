const { body } = require('express-validator');

// Product validation rules
const productValidationRules = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('discount').optional().isNumeric().withMessage('Discount must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('variants').optional().isArray().withMessage('Variants must be an array'),
  body('inventory').optional().isNumeric().withMessage('Inventory must be a number'),
];

// Category validation rules
const categoryValidationRules = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
];

module.exports = {
  productValidationRules,
  categoryValidationRules,
}; 