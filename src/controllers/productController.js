// controllers/productController.js
const productService = require('../services/productService');

/**
 * Controller functions use Express (req, res) signatures and
 * respond with status codes matching MDN/HTTP recommendations.
 * Input validation is handled upstream by the route's validation
 * chains + the `validate` middleware.
 */

exports.create = async (req, res, next) => {
    try {
        const { name, description, imageUrl, price } = req.body;
        const created = await productService.create({ name, description, imageUrl, price });
        // 201 Created
        return res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const products = await productService.findAll();
        // 200 OK
        return res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const product = await productService.findById(id);
        if (!product) return res.status(404).json({ error: 'Product not found' }); // 404 Not Found

        return res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name, description, imageUrl, price } = req.body;
        const updated = await productService.update(id, { name, description, imageUrl, price });
        if (!updated) return res.status(404).json({ error: 'Product not found' }); // 404 Not Found

        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const deleted = await productService.delete(id);
        if (deleted === 0) return res.status(404).json({ error: 'Product not found' });

        // 204 No Content on successful delete
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};
