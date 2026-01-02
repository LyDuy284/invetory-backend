const { Product } = require('../models');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    let imageUrl;

    if (req.file && req.file.path) {
      imageUrl = req.file.path;
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
      userId: req.user.id,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!product) return res.status(404).json({ message: 'Not found' });

    const { name, description, price, stock } = req.body;

    if (req.file && req.file.path) {
      product.imageUrl = req.file.path;
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!product) return res.status(404).json({ message: 'Not found' });

    await product.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
