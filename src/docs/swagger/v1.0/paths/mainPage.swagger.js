import { makeStatusResponse } from '../common.swagger.js';
import { error_500 } from '../errors.swagger.js';

export const mainPageSwagger = {
  paths: {
    '/': {
      get: {
        summary: 'Страница приветствия',
        description: "Главная страница сайта. Возвращает информационное сообщение",
        tags: ['General'],
        security: [],
        responses: {
          200: makeStatusResponse("Welcome to Koa API"),
          500: error_500
        }
      }
    }
  }
}