import { makeMultipartRequestBody } from "../common.swagger.js";
import { makeSingleResponse } from "../common.swagger.js";
import { error_400, error_401 } from "../errors.swagger.js";

export const profileSwagger = {
  paths: {
    '/profile': {
      get: {
        summary: 'Авторизация при наличии токена.',
        description: "Возвращает объект пользователя.",
        tags: ['Auth'],
        responses: {
          200: makeSingleResponse('UserResponse'),
          400: error_400,
          401: error_401
        }
      },
      patch: {
        summary: 'Обновление информации о пользователе.',
        description: "Возвращает объект пользователя.",
        tags: ['Auth'],
        security: [{ BearerAuth: [] }],
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