const { Product, Category } = require('../models');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'price', 'description', 'image'],
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        });

        const categories = await Category.findAll()
        res.status(200).json({products: products, categories: categories});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({
            where: {id: id},
            attributes: ['id', 'name', 'price', 'description', 'image'],
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        })
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product); // Send the product data as JSON
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
}

exports.getProductsByCategories = async (req, res) => {
    const { categories } = req.query;

    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                as: 'categories',
                where: { id: categories },
                attributes: ['id', 'name'],
                through: { attributes: [] },
            },
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Error fetching products by category' });
    }
};