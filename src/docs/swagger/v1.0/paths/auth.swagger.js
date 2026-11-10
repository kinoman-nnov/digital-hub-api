import { makeRequestBody } from '../common.swagger.js';
import { makeSingleResponse } from '../common.swagger.js';
import { error_400, error_401 } from '../errors.swagger.js';

export const authSwagger = {
  paths: {
    '/login': {
      post: {
        summary: 'Авторизация пользователя',
        description: "Авторизация после пользовательского ввода.",
        tags: ['Auth'],
        requestBody: makeRequestBody('LoginRequestBody'),
        responses: {
          200: makeSingleResponse('AuthorizedUserResponse', 'Пользователь успешно авторизован.'),
          400: error_400,
          401: error_401
        }
      }
    },
    '/registration': {
      post: {
        summary: "Регистрация пользователя",
        description: "Создание нового пользователя (регистрация).",
        tags: ['Auth'],
        requestBody: makeRequestBody('RegisterRequestBody'),
        responses: {
          200: makeSingleResponse('AuthorizedUserResponse', 'Пользователь успешно зарегистрирован.'),
          400: error_400,
          401: error_401
        }
      },
    },
    '/refresh-token': {
      post: {
        summary: 'Обновление access-токена (BFF паттерн).',
        description: "Принимает refresh-токен автоматически из HttpOnly Cookies. Возвращает новый access-токен в теле и обновляет куку.",
        parameters: [],
        tags: ['Auth'],
        security: [{ BearerAuth: [] }],
        // requestBody: makeMultipartRequestBody('UpdateProfileRequestBody'),
        // responses: {
        //   200: makeSingleResponse('UserResponse', 'Успешное обновление токенов.'),
        //   401: error_401
        // }
      }
    }
  }
}