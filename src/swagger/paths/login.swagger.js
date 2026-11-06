import { makeRequestBody } from '../common.swagger.js';
import { makeSingleResponse } from '../common.swagger.js';
import { error_400, error_401 } from '../errors.swagger.js';

export const loginSwagger = {
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
    }
  }
}