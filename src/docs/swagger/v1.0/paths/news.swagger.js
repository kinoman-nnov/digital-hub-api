import { makePaginatedResponse, makeRequestBody } from '../common.swagger.js';
import { error_400, error_401, error_403, error_404 } from '../errors.swagger.js';

const newsIdParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: { type: 'string' },
  description: 'Идентификатор новости',
  example: 'news_6745670cvb'
};

export const newsSwagger = {
  paths: {
    '/news': {
      get: {
        summary: 'Получение списка всех новостей.',
        description: "Возвращает список всех новостей из базы данных.",
        tags: ['News'],
        responses: {
          200: makePaginatedResponse('NewsResponse', 'Список новостей успешно получен.'),
          401: error_401,
          403: error_403
        }
      },
      post: {
        summary: 'Создание новой новости.',
        description: 'Создает новую новость в БД и возвращает обновленный список всех новостей из базы данных.',
        tags: ['News'],
        requestBody: makeRequestBody('NewsRequestBody'),
        responses: {
          200: makePaginatedResponse('NewsResponse', 'Новость успешно создана.'),
          400: error_400,
          401: error_401,
          403: error_403
        }
      }
    },
    '/news/{id}': {
      patch: {
        summary: 'Обновление существующей новости.',
        description: 'Обновляет существующую новость по id из базы данных и возвращает обновленный список всех новостей.',
        parameters: [newsIdParam],
        tags: ['News'],
        requestBody: makeRequestBody('NewsRequestBody'),
        responses: {
          200: makePaginatedResponse('NewsResponse', 'Новость успешно обновлена.'),
          400: error_400,
          401: error_401,
          403: error_403,
          404: error_404
        }
      },
      delete: {
        summary: 'Удаление существующей новости.',
        description: "Удаляет существующую новость по id из базы данных и возвращает обновленный список всех новостей.",
        parameters: [newsIdParam],
        tags: ['News'],
        responses: {
          200: makePaginatedResponse('NewsResponse', 'Новость успешно удалена.'),
          401: error_401,
          403: error_403,
          404: error_404
        }
      }
    }
  }
}