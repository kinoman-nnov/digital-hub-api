import {
  makePaginatedResponse,
  makeSingleResponse,
  makeStatusResponse,
  makeMultipartRequestBody,
  makeRequestBody
} from '../common.swagger.js';
import { error_400, error_401, error_403, error_404 } from '../errors.swagger.js';

const userIdParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: { type: 'string' },
  description: 'Идентификатор пользователя для обновления существующей записи.',
  example: 'user_37390dfe3f4g5gdfs5454df3'
};

export const usersSwagger = {
  paths: {
    '/users': {
      get: {
        summary: 'Получение списка всех пользователей.',
        description: "Возвращает список всех пользователей из базы данных.",
        tags: ['Users'],
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
        description: "Удаляет пользователя по id из базы данных и возвращает информационное сообщение.",
        parameters: [userIdParam],
        tags: ['Users'],
        responses: {
          200: makeStatusResponse('Пользователь успешно удален.'),
          401: error_401,
          403: error_403,
          404: error_404
        }
      }
    },
    '/users/{id}/permission': {
      patch: {
        summary: 'Обновление существующей записи о разрешениях конкретного пользователя.',
        description: 'Обновляет разрешения в существующей записи из БД для конкретного пользователя и возвращает объект обновленного пользователя.',
        parameters: [userIdParam],
        tags: ['Users'],
        requestBody: makeRequestBody('UpdatePermissionRequestBody'),
        responses: {
          200: makeSingleResponse('UserResponse', 'Разрешения пользователя успешно обновлены.'),
          400: error_400,
          401: error_401,
          403: error_403,
          404: error_404
        }
      }
    },
    '/profile': {
      get: {
        summary: 'Авторизация при наличии токена.',
        description: "Авторизует пользователя при наличии токена и возвращает объект пользователя.",
        tags: ['Users'],
        responses: {
          200: makeSingleResponse('UserResponse', 'Профиль пользователя успешно получен.'),
          400: error_400,
          401: error_401
        }
      },
      patch: {
        summary: 'Обновление информации о пользователе.',
        description: 'Обновляет существующую информацию о пользователе и возвращает объект обновленного пользователя.',
        tags: ['Users'],
        requestBody: makeMultipartRequestBody('UpdateProfileRequestBody'),
        responses: {
          200: makeSingleResponse('UserResponse', 'Информация о пользователе успешно обновлена.'),
          400: error_400,
          401: error_401
        }
      }
    }
  }
}