import { makePaginatedResponse } from '../common.swagger.js';
import { error_401, error_403 } from '../errors.swagger.js';

export const usersSwagger = {
  paths: {
    '/users': {
      get: {
        summary: 'Получение списка всех пользователей.',
        description: "Возвращает список всех пользователей из базы данных.",
        tags: ['Users'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: makePaginatedResponse('UserResponse', 'Список пользователей успешно получен'),
          401: error_401,
          403: error_403
        }
      }
    }
  }
}