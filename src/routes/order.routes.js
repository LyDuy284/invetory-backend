// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth.middleware');
// const {
//   createOrder,
//   getOrders,
//   updateOrderStatus,
// } = require('../controllers/order.controller');

// router.use(auth);

// router.get('/', getOrders);
// router.post('/', createOrder);
// router.patch('/:id/status', updateOrderStatus);

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require('../controllers/order.controller');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Quản lý đơn hàng
 */

router.use(auth);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lấy danh sách đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách đơn hàng
 */
router.get('/', getOrders);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Tạo đơn hàng mới
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Tạo đơn hàng thành công
 */
router.post('/', createOrder);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Cập nhật trạng thái đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
