import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Management API',
      version: '1.0.0',
      description: 'Sipariş yönetim sistemi için Swagger dökümantasyonu',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        OrderItem: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Ürün A' },
            quantity: { type: 'number', example: 2 },
            price: { type: 'number', example: 99.99 },
          },
          required: ['name', 'quantity', 'price'],
        },
        Order: {
          type: 'object',
          properties: {
            orderNumber: { type: 'string', example: 'ORD123456' },
            customerName: { type: 'string', example: 'Ahmet Yılmaz' },
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/OrderItem' },
            },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'completed'],
              default: 'pending',
              example: 'pending',
            },
            total: { type: 'number', example: 199.98 },
          },
          required: ['orderNumber', 'customerName', 'items', 'total'],
        },
      },
    },
    paths: {
      '/orders': {
        get: {
          summary: 'Siparişleri filtreli listele',
          parameters: [
            {
              in: 'query',
              name: 'status',
              schema: {
                type: 'string',
                enum: ['pending', 'processing', 'completed'],
              },
              description: 'Sipariş durumu ile filtrele',
            },
            {
              in: 'query',
              name: 'startDate',
              schema: {
                type: 'string',
                format: 'date-time',
              },
              description: 'Başlangıç tarihi ile filtrele',
            },
            {
              in: 'query',
              name: 'endDate',
              schema: {
                type: 'string',
                format: 'date-time',
              },
              description: 'Bitiş tarihi ile filtrele',
            },
          ],
          responses: {
            200: {
              description: 'Filtrelenmiş sipariş listesi',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
