const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const { name, category, createdAfter } = req.query;
        let filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        if (category) {
            filter.category = category;
        }
        if (createdAfter) {
            filter.createdAt = { $gte: new Date(createdAfter) };
        }
        const products = await Product.find(filter).populate('category');
        // Add discountedPrice to each product
        const productsWithDiscount = products.map(product => {
            const discountedPrice = product.price && product.discount
                ? product.price * (1 - product.discount / 100)
                : product.price;
            return {
                ...product.toObject(),
                discountedPrice
            };
        });
        res.status(200).json(productsWithDiscount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLowStockProducts = async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold) || 5;
        const products = await Product.find({ inventory: { $lt: threshold } }).populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
