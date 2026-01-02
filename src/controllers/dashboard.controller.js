const { Product, Order } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [productCount, totalStock, completedOrders, revenue] = await Promise.all([
      Product.count({ where: { userId } }),
      Product.sum('stock', { where: { userId } }),
      Order.count({ where: { userId, status: 'completed' } }),
      Order.sum('totalPrice', { where: { userId, status: 'completed' } }),
    ]);

    res.json({
      productCount: productCount || 0,
      totalStock: totalStock || 0,
      completedOrders: completedOrders || 0,
      revenue: Number(revenue || 0),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboardStats };
