import { makeMultipartRequestBody } from "../common.swagger.js";
import { makeSingleResponse } from "../common.swagger.js";
import { error_400, error_401 } from "../errors.swagger.js";

export const profileSwagger = {
  paths: {
    '/refresh-token': {
      post: {
        summary: 'Обновление access-токена (BFF паттерн).',
        description: "Принимает refresh-токен автоматически из HttpOnly Cookies. Возвращает новый access-токен в теле и обновляет куку.",
        parameters: [],
        tags: ['Auth'],
        security: [{ BearerAuth: [] }],
        requestBody: makeMultipartRequestBody('UpdateProfileRequestBody'),
        responses: {
          200: makeSingleResponse('UserResponse', 'Успешное обновление токенов.'),
          401: error_401
        }
      }
    }
  }
}