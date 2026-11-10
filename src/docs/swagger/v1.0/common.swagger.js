// для стандартных JSON-запросов
export const makeRequestBody = (schemaName, description = 'Успешный запрос') => ({
  required: true,
  content: {
    'application/json': {
      schema: {
        $ref: `#/components/schemas/${schemaName}`
      }
    }
  }
});
// для запросов с файлами
export const makeMultipartRequestBody = (schemaName, description = 'Запрос с передачей файлов') => ({
  required: true,
  content: {
    'multipart/form-data': {
      schema: {
        $ref: `#/components/schemas/${schemaName}`
      }
    }
  }
});
// для списков
export const makePaginatedResponse = (schemaName, description = 'Успешный ответ') => ({
  description,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['items', 'meta'],
        properties: {
          data: {
            type: 'array',
            items: { $ref: `#/components/schemas/${schemaName}` }
          },
          meta: {
            type: 'object',
            required: ['total', 'limit', 'page'],
            properties: {
              total: { type: 'integer', example: 100 },
              limit: { type: 'integer', example: 10 },
              page: { type: 'integer', example: 1 }
            }
          }
        }
      }
    }
  }
});
// для одного объекта
export const makeSingleResponse = (schemaName, description = 'Успешный ответ') => ({
  description,
  content: {
    'application/json': {
      schema: {
        allOf: [
          { $ref: `#/components/schemas/${schemaName}` },
          {
            type: 'object',
            required: ['meta'],
            properties: {
              meta: {
                type: 'object',
                properties: {
                  timestamp: {
                    type: 'string',
                    format: 'date-time',
                    example: '2026-10-29T13:57:00Z'
                  }
                }
              }
            }
          }
        ]
      }
    }
  }
});
// для простых сообщений
export const makeStatusResponse = (messageExample = 'Операция успешно выполнена', description = 'Успешный ответ') => ({
  description,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            type: 'string',
            example: messageExample
          },
          meta: {
            type: 'string',
            example: 'Системное сообщение'
          }
        }
      }
    }
  }
});