const express = require("express");
const { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} = require("../controllers/categoryController");
const { categoryValidationRules } = require('../middlewares/validators');
const { validationErrorHandler } = require('../middlewares/errorHandler');


const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post('/', categoryValidationRules, validationErrorHandler, createCategory);
router.put('/:id', categoryValidationRules, validationErrorHandler, updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
