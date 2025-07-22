const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: Number,
    discount: { type: Number, default: 0 }, // Discount percentage (e.g., 10 for 10%)
    variants: [{ size: String, color: String, stock: Number }],
    inventory: { type: Number, default: 0 }
});
module.exports = mongoose.model('Product', ProductSchema);
