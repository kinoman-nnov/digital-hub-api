import { makeRequestBody } from "../common.swagger.js";
import { makeSingleResponse } from '../common.swagger.js';
import { error_400, error_401 } from '../errors.swagger.js';

export const registrationSwagger = {
  paths: {
    '/registration': {
      post: {
        summary: "Регистрация пользователя",
        description: "Создание нового пользователя (регистрация).",
        tags: ['Auth'],
        requestBody: makeRequestBody('RegRequestBody'),
        responses: {
          200: makeSingleResponse('AuthorizedUserResponse', 'Пользователь успешно зарегистрирован.'),
          400: error_400,
          401: error_401
        }
      },
    }
  }
}