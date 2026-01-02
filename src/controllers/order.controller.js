const { sequelize, Product, Order, OrderItem } = require('../models');

const createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items required' });
    }

    let totalPrice = 0;

    for (const item of items) {
      const product = await Product.findOne({
        where: { id: item.productId, userId: req.user.id },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!product) {
        await t.rollback();
        return res.status(400).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }
      totalPrice += Number(product.price) * item.quantity;
    }

    const order = await Order.create(
      {
        userId: req.user.id,
        status: 'pending',
        totalPrice,
      },
      { transaction: t }
    );

    for (const item of items) {
      const product = await Product.findOne({
        where: { id: item.productId, userId: req.user.id },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      await OrderItem.create(
        {
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        },
        { transaction: t }
      );

      product.stock -= item.quantity;
      await product.save({ transaction: t });
    }

    await t.commit();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    await t.rollback();
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          association: 'items',
          through: { attributes: ['quantity', 'price'] },
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!order) return res.status(404).json({ message: 'Not found' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
};
