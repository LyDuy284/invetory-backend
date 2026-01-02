// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// require('dotenv').config();

// const { sequelize } = require('./models');

// const authRoutes = require('./routes/auth.routes');
// const productRoutes = require('./routes/product.routes');
// const orderRoutes = require('./routes/order.routes');

// const app = express();

// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// // Health check
// app.get('/', (req, res) => {
//   res.json({ message: 'Inventory API running' });
// });

// // Sync DB when start
// sequelize
//   .sync()
//   .then(() => console.log('Database synced'))
//   .catch((err) => console.error('DB sync error:', err));

// module.exports = app;

//Swagger API
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const dashboardRoutes = require('./routes/dashbord.routes');

// ⭐ import swagger
const { swaggerUi, specs } = require('./swagger');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ⭐ route Swagger UI: FE chỉ cần vào /api-docs
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(specs));

// Routes chính
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Inventory API running' });
});

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('DB sync error:', err));

module.exports = app;
