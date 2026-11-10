import { makePaginatedResponse, makeRequestBody } from '../common.swagger.js';
import { error_401, error_403 } from '../errors.swagger.js';

export const newsSwagger = {
  paths: {
    '/news': {
      get: {
        summary: 'Получение списка всех новостей.',
        description: "Возвращает список всех новостей из базы данных.",
        tags: ['News'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: makePaginatedResponse('NewsResponse', 'Список новостей успешно получен.'),
          401: error_401,
          403: error_403
        }
      },
      post: {
        summary: 'Создание новой новости.',
        description: "Возвращает обновленный список всех новостей из базы данных. Сигнатура запроса: { text, title }.",
        tags: ['News'],
        security: [{ BearerAuth: [] }],
        requestBody: makeRequestBody('NewsRequestBody'),
        responses: {
          200: makePaginatedResponse('NewsResponse', 'Новость успешно создана.'),
          401: error_401,
          403: error_403
        }
      }
    },
    '/news/{id}': {
      patch: {
        summary: 'Обновление существующей новости по id из базы данных.',
        description: "Возвращает обновленный список всех новостей из базы данных. Сигнатура запроса: { text, title }.",
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Идентификатор новости для удаления',
            example: 'news_6745670cvb'
          }
        ],
        tags: ['News'],
        security: [{ BearerAuth: [] }],
        requestBody: makeRequestBody('NewsRequestBody'),
        responses: {
          200: makePaginatedResponse('NewsResponse', 'Новость успешно обновлена.'),
          401: error_401,
          403: error_403
        }
      },
      delete: {

      }
    }
  }
}