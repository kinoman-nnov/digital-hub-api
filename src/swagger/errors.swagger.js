const errorTemplate = {
  400: {
    description: 'Некорректный запрос. Запрос непонятен для сервера из-за неверного синтаксиса.',
    errExample: 'Bad Request',
    msgExample: 'Invalid JSON payload in request body'
  },
  401: {
    description: 'Неавторизованный доступ (неверный или отсутствующий токен).',
    errExample: 'Unauthorized',
    msgExample: 'Invalid JWT token'
  },
  403: {
    description: 'Запрещено. У пользователя нет прав на этот ресурс.',
    errExample: 'Forbidden',
    msgExample: 'Access denied: Requires administrator privileges'
  },
  404: {
    description: 'Не найдено. Ссылка или ресурс не существуют на сервере.',
    errExample: 'Not Found',
    msgExample: 'The link or resource does not exist on the server'
  },
  405: {
    description: 'Метод не поддерживается.',
    errExample: 'Method Not Allowed',
    msgExample: 'Method PUT is not allowed for this route'
  },
  409: {
    description: 'Конфликт запроса. Попытка добавить продукт, который уже есть в базе данных.',
    errExample: 'Conflict',
    msgExample: 'Product with this SKU already exists'
  },
  413: {
    description: 'Превышен размер запроса. Передан слишком большой файл.',
    errExample: 'Payload Too Large',
    msgExample: 'File too large: Max size is 5 MB'
  },
  422: {
    description: 'Необрабатываемая сущность. Запрос понятен и синтаксис верен, но данные не прошли бизнес-валидацию.',
    errExample: 'Unprocessable Entity',
    msgExample: 'Validation failed: Price cannot be negative'
  },
}

const makeErrorResponse = ({ description, errExample, msgExample }) => {
  const customProperties = {};
  if (errExample) customProperties.error = { example: errExample };
  if (msgExample) customProperties.message = { example: msgExample };
  
  return {
    description,
    content: {
      'application/json': {
        schema: {
          allOf: [
            { $ref: '#/components/schemas/ErrorResponse' },
            ...(Object.keys(customProperties).length > 0
              ? [{ type: 'object', properties: customProperties }]
              : [])
          ]
        }
      }
    }
  }
};

export const error_400 = makeErrorResponse(errorTemplate[400]);
export const error_401 = makeErrorResponse(errorTemplate[401]);
export const error_403 = makeErrorResponse(errorTemplate[403]);
export const error_404 = makeErrorResponse(errorTemplate[404]);
export const error_405 = makeErrorResponse(errorTemplate[405]);
export const error_409 = makeErrorResponse(errorTemplate[409]);
export const error_413 = makeErrorResponse(errorTemplate[413]);
export const error_422 = makeErrorResponse(errorTemplate[422]);