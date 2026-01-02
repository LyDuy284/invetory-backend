const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const { url } = require('inspector');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory API',
      version: '1.0.0',
      description: 'API quản lý sản phẩm & đơn hàng cho frontend',
    },
    // servers: [
    //   {
    //     url: 'http://localhost:4000',
    //   },
    // ],
    servers: [
      {
        // url: 'https://invetorybackend.onrender.com',
        url: 'https://invetory-backend-2qkn.onrender.com',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(__dirname, 'routes', '*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
