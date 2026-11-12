const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1.0';

const baseSwagger = {
  openapi: '3.0.0',

  // Метаданные проекта
  info: {
    title: 'Digital Hub Web API',
    version: '1.0.0',
    description: 'Документация, собранная из JS-модулей для Koa API.',
    contact: {
      name: 'API Support Team',
      email: 'support@example.com'
    }
  },

  // Базовые URL-адреса серверов (Swagger UI будет отправлять запросы сюда)
  servers: [
    {
      url: process.env.API_BASE_URL || `http://localhost:${PORT}/api/${API_VERSION}`,
      description: process.env.NODE_ENV === 'production' ? 'Production Server' : 'Local Development Environment'
    }
  ],

  // Глобальные теги для группировки эндпоинтов в интерфейсе
  tags: [
    { name: 'General', description: 'Приветственная страница. Общие и системные запросы (статус API)' },
    { name: 'Auth', description: 'Регистрация, вход в систему, управление сессией и токенами' },
    { name: 'Users', description: 'Просмотр и редактирование профилей, управление правами доступа и удаление' },
    { name: 'News', description: 'Управление новостной лентой (CRUD операции)' }
  ],

  // Роуты приложения
  paths: {},

  security: [
    { BearerAuth: [] } // Применить авторизацию ко ВСЕМ рутам по умолчанию
  ],

  // Хранилище шаблонов (компонентов)
  components: {
    // === Описание заголовков ===
    headers: {
      SetRefreshCookie: {
        description: 'Установка/обновление долгоживущего рефреш-токена в HttpOnly куку',
        schema: {
          type: 'string',
          example: 'refreshToken=eyJhbGciOi...; Path=/refresh-token; HttpOnly; Secure; SameSite=Strict'
        }
      }
    },

    // Шаблоны моделей данных (схемы)
    schemas: {
      // === Общие системные ответы API ===
      ErrorResponse: {
        type: 'object',
        required: ['error', 'message'],
        properties: {
          error: { type: 'string', example: 'BAD_REQUEST' },
          message: { type: 'string', example: 'An error occurred' }
        }
      },

      // === Модели объектов (Запросы) ===

      // Сигнатура запроса логина
      LoginRequestBody: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: "string", example: "john_doe" },
          password: { type: "string", example: 'secret123' }
        }
      },

      // Сигнатура запроса создание нового пользователя (регистрация)
      RegisterRequestBody: {
        allOf: [
          { $ref: '#/components/schemas/LoginRequestBody' },
          {
            type: 'object',
            required: ['firstName', 'surName', 'middleName'],
            properties: {
              firstName: { type: 'string', example: 'Иван' },
              surName: { type: 'string', example: 'Иванов' },
              middleName: { type: 'string', example: 'Иванович' }
            }
          }
        ]
      },

      // Сигнатура запроса на обновление профиля
      UpdateProfileRequestBody: {
        type: 'object',
        properties: {
          firstName: { type: 'string', example: 'Иван', description: 'Новое имя' },
          middleName: { type: 'string', example: 'Иванович', description: 'Новое отчество' },
          surName: { type: 'string', example: 'Иванов', description: 'Новая фамилия' },
          oldPassword: { type: 'string', example: 'old_secret123', description: 'Текущий пароль для подтверждения изменений' },
          newPassword: { type: 'string', example: 'new_secret123', description: 'Новый пароль (если меняется)' },
          avatar: {
            type: 'string',
            format: 'binary',
            description: 'Файл изображения аватара (JPEG/PNG)'
          }
        }
      },

      UpdatePermissionRequestBody: {
        type: 'object',
        required: ['permission'],
        properties: {
          permission: {
            $ref: '#/components/schemas/Permission'
          }
        }
      },

      // Сигнатура запроса создание новости
      NewsRequestBody: {
        type: 'object',
        required: ['text', 'title'],
        properties: {
          title: { type: 'string', example: 'Заголовок новости' },
          text: { type: 'string', example: 'Текст новой новости' }
        }
      },

      // === Модели объектов (Ответы) ===

      // Базовый объект пользователя
      User: {
        type: 'object',
        required: ['id', 'username', 'firstName', 'surName'],
        properties: {
          id: { type: "string", example: "60c72b2f9b1d8b001558f65a" },
          username: { type: 'string', example: 'john_doe' },
          firstName: { type: 'string', example: 'Иван' },
          surName: { type: 'string', example: 'Иванов' },
          image: { type: 'string', example: '/storage/img/avatar.jpg' },
          middleName: { type: 'string', example: 'Иванович' }
        }
      },

      // Объект permission
      Permission: {
        type: 'object',
        required: ['chat', 'news', 'settings'],
        properties: {
          chat: { type: 'object', properties: { C: { type: 'boolean' }, R: { type: 'boolean' }, U: { type: 'boolean' }, D: { type: 'boolean' } } },
          news: { type: 'object', properties: { C: { type: 'boolean' }, R: { type: 'boolean' }, U: { type: 'boolean' }, D: { type: 'boolean' } } },
          settings: { type: 'object', properties: { C: { type: 'boolean' }, R: { type: 'boolean' }, U: { type: 'boolean' }, D: { type: 'boolean' } } }
        }
      },

      UserResponse: {
        allOf: [
          { $ref: '#/components/schemas/User' },
          {
            type: 'object',
            required: ['permission'],
            properties: {
              permission: { $ref: '#/components/schemas/Permission' }
            }
          }
        ]
      },

      // === BFF PATTERN ===
      BffTokenResponse: {
        type: 'object',
        required: ['accessToken'],
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5MzI4MDkwMH0.signature_here',
            description: 'Короткоживущий JWT-токен доступа (15 минут), сохраняемый в RAM памяти фронтенда'
          },
          accessTokenExpiredAt: {
            type: 'integer',
            format: 'int64',
            example: 1793280900000,
            description: 'Время истечения Access-токена в миллисекундах (Unix Timestamp)'
          }
        }
      },

      // Объект с токенами
      TokenResponse: {
        type: 'object',
        required: ['accessToken', 'refreshToken', 'accessTokenExpiredAt', 'refreshTokenExpiredAt'],
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5MzI4MDkwMH0.signature_here',
            description: 'Короткоживущий JWT-токен доступа (15 минут)'
          },
          refreshToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5NTg3MjkwMH0.signature_here',
            description: 'Долгоживущий JWT-токен для обновления сессии (30 дней)'
          },
          accessTokenExpiredAt: {
            type: 'integer',
            format: 'int64',
            example: 1793280900000,
            description: 'Время истечения Access-токена в миллисекундах (Unix Timestamp)'
          },
          refreshTokenExpiredAt: {
            type: 'integer',
            format: 'int64',
            example: 1795872900000,
            description: 'Время истечения Refresh-токена в миллисекундах (Unix Timestamp)'
          }
        }
      },

      // Объект авторизованного пользователя (расширяет UserResponse)
      AuthorizedUserResponse: {
        allOf: [
          { $ref: '#/components/schemas/UserResponse' },
          { $ref: '#/components/schemas/TokenResponse' }
        ]
      },

      // Объект авторизованного пользователя (BFF паттерн)
      BffAuthorizedUserResponse: {
        allOf: [
          { $ref: '#/components/schemas/UserResponse' },
          { $ref: '#/components/schemas/BffTokenResponse' }
        ]
      },

      // Объект новости
      NewsResponse: {
        type: 'object',
        required: ['id', 'created_at', 'text', 'title', 'user'],
        properties: {
          id: { type: "string", example: "6dsgu578k3m3j56k6jgh6gh78" },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2026-11-09T12:00:00.000Z'
          },
          title: { type: 'string', example: 'Заголовок новости' },
          text: { type: 'string', example: 'Текст новости от пользователя' },
          user: { $ref: '#/components/schemas/User' }
        }
      }
    },

    // Настройки безопасности (Авторизация)
    securitySchemes: {
      // Описание JWT Bearer авторизации (активирует кнопку Authorize)
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Введите ваш JWT-токен (Bearer подставится автоматически)'
      }
    }
  }
};

export default baseSwagger;