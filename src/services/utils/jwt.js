import crypto from 'node:crypto';

// Декодирование из Base64Url в обычную строку
const decodeBase64Url = (str) => Buffer.from(str, 'base64url').toString('utf8');

export function signJwt(payload, secret, expiresInSeconds = 900) {
  if (!secret || typeof secret !== 'string' || secret.length < 32) {
    throw new Error('Секретный ключ JWT отсутствует');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);

  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
    jti: crypto.randomUUID() // Уникальный ID токена
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');

  // Signature = HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyJwt(token, secret) {

  if (!token || !secret) throw new Error('Отсутствует токен или секретный ключ');

  const parts = token.split('.');

  if (parts.length < 3) throw new Error('Неверный формат JWT-токена');

  const [encodedHeader, encodedPayload, signature] = parts;

  let header;
  try {
    header = JSON.parse(decodeBase64Url(encodedHeader));
  } catch (err) {
    throw new Error('Некорректный заголовок токена');
  }

  if (header.alg !== 'HS256') throw new Error('Неподдерживаемый алгоритм шифрования токена');

  // Вычисляем эталонную подпись на основе секретного ключа
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  // Сравниваем подписи с crypto.timingSafeEqual
  if (
    sigBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  ) throw new Error('Недействительная подпись токена');

  let payload;
  try {
    payload = JSON.parse(decodeBase64Url(encodedPayload));
  } catch (err) {
    throw new Error('Некорректные данные внутри токена');
  }

  // Проверяем срок действия токена в секундах
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < currentTimestamp) {
    throw new Error('Срок действия access-токена истек');
  }

  return payload;
}