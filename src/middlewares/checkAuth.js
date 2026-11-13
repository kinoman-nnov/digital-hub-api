import { verifyJwt } from '../services/utils/jwt.js';

export async function checkAuth(ctx, next) {
  try {
    const authHeader = ctx.headers.authorization;

    // Проверяем наличие заголовка и префикса "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      ctx.status = 401;
      ctx.body = {
        error: 'Unauthorized',
        message: 'Отсутствует или неверный формат токена доступа'
      };
      return;
    }

    // Получаем чистую строку токена
    const token = authHeader.split(' ')[1];

    // Проверяем цифровую подпись и срок годности токена
    const decodedPayload = verifyJwt(token, process.env.JWT_ACCESS_SECRET);

    // Сохраняем расшифрованные данные пользователя в контекст запроса
    ctx.state.user = decodedPayload;

    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      error: 'Unauthorized',
      message: err.message || 'Недействительный или истекший access-токен'
    };
  }
}