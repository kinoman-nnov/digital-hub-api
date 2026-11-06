// для стандартных JSON-запросов
export const makeRequestBody = (schemaName, description = 'Успешный запрос') => ({
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            $ref: `#/components/schemas/${schemaName}`
          },
        }
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
        required: ['data'],
        properties: {
          data: {
            type: 'array',
            items: {
              $ref: `#/components/schemas/${schemaName}`
            }
          },
          meta: {
            type: 'object',
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
        type: 'object',
        required: ['data'],
        properties: {
          data: {
            $ref: `#/components/schemas/${schemaName}`
          },
          meta: { // метаданные для одиночного запроса
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
        required: ['message', 'version'],
        properties: {
          message: {
            type: 'string',
            example: messageExample
          },
          version: {
            type: 'string',
            example: '1.0.0'
          }
        }
      }
    }
  }
});