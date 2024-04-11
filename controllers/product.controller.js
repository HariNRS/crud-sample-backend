const Product = require('../models/product.model.js');

// index.js line 20-27
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// index.js line 29-37
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// index.js line 39-46
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// index.js line 50-66
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
    
        const product = await Product.findByIdAndUpdate(id, req.body);
    
        if (!product) {
          return res.status(404).json({message: "Product not found"});
        }
    
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

// index.js line 70-85
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
    
        if (!product) {
          return res.status(404).json({message: "Product not found"});
        };
    
        const getAllProducts = await Product.find({});
    
        res.status(200).json({message:" Product deleted successfully"});
      } catch (error) {
        res.status(500).json({message: error.message});
      }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}