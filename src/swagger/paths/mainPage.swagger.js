import { makeStatusResponse } from '../common.swagger.js';
import { error_400 } from '../errors.swagger.js'

export const mainPageSwagger = {
  paths: {
    '/': {
      get: {
        summary: 'Страница приветствия',
        description: "Главная страница сайта. Возвращает информационное сообщение",
        tags: ['General'],
        responses: {
          200: makeStatusResponse("Welcome to Koa API"),
          400: error_400
        }
      }
    }
  }
}