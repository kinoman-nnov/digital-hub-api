import { makePaginatedResponse, makeStatusResponse } from '../common.swagger.js';
import { error_401, error_403, error_404 } from '../errors.swagger.js';

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
    },
    '/users/{id}': {
      delete: {
        summary: 'Удаление пользователя из списка.',
        description: "Удаляет пользователя по id из базы данных.",
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Идентификатор пользователя для удаления',
            example: 'user_60c72b2f9b1d8b001558f65a'
          }
        ],
        tags: ['Users'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: makeStatusResponse('Пользователь успешно удален.'),
          401: error_401,
          403: error_403,
          404: error_404
        }
      }
    }
  }
}