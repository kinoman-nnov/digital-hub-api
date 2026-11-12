import { makeRequestBody, makeSingleResponse } from '../common.swagger.js';
import { error_400, error_401, error_409 } from '../errors.swagger.js';

export const authSwagger = {
  paths: {
    '/login': {
      post: {
        summary: 'Авторизация пользователя (BFF паттерн).',
        description: 'Авторизация после пользовательского ввода. Возвращает объект авторизованного пользователя (BFF паттерн).',
        tags: ['Auth'],
        security: [],
        requestBody: makeRequestBody('LoginRequestBody'),
        responses: {
          200: {
            ...makeSingleResponse('BffAuthorizedUserResponse', 'Пользователь успешно авторизован.'),
            headers: {
              'Set-Cookie': {
                $ref: '#/components/headers/SetRefreshCookie'
              }
            }
          },
          400: error_400,
          401: error_401
        }
      }
    },
    '/registration': {
      post: {
        summary: "Регистрация пользователя (BFF паттерн).",
        description: 'Создание нового пользователя (регистрация). Возвращает объект авторизованного пользователя (BFF паттерн).',
        tags: ['Auth'],
        security: [],
        requestBody: makeRequestBody('RegisterRequestBody'),
        responses: {
          201: {
            ...makeSingleResponse('BffAuthorizedUserResponse', 'Пользователь успешно зарегистрирован.'),
            headers: {
              'Set-Cookie': {
                $ref: '#/components/headers/SetRefreshCookie'
              }
            }
          },
          400: error_400,
          409: error_409
        }
      },
    },
    '/refresh-token': {
      post: {
        summary: 'Обновление access-токена (BFF паттерн).',
        description: "Принимает refresh-токен из HttpOnly Cookies. Возвращает объект авторизованного пользователя (BFF паттерн) с access-токеном и обновляет куку.",
        tags: ['Auth'],
        security: [],
        responses: {
          200: {
            ...makeSingleResponse('BffAuthorizedUserResponse', 'Успешное обновление токенов.'),
            headers: {
              'Set-Cookie': {
                $ref: '#/components/headers/SetRefreshCookie'
              }
            }
          },
          401: error_401
        }
      }
    }
  }
}