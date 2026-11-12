export async function login(ctx, next) {
  const { username, password } = ctx.request.body;

  ctx.status = 200;
  ctx.body = {
    id: "60c72b2f9b1d8b001558f65a",
    username,
    firstName: 'Иван',
    surName: 'Иванов',
    middleName: 'Иванович',
    image: '/storage/img/default.png',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    },
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5MzI4MDkwMH0.signature_here',
    accessTokenExpiredAt: 1793280900000
  };

  console.log("[POST LOGIN]");
}

export async function register(ctx, next) {
  const { username, firstName, surName, middleName, password } = ctx.request.body;

  ctx.status = 201;
  ctx.body = {
    id: "60c72b2f9b1d8b001558f65a",
    username,
    firstName,
    surName,
    middleName,
    image: '/uploads/avatars/default.png',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    },
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5MzI4MDkwMH0.signature_here',
    accessTokenExpiredAt: 1793280900000
  };

  console.log("[POST REGISTRATION]");
}

export async function refreshToken(ctx, next) {

  ctx.status = 200;
  ctx.body = {
    id: "60c72b2f9b1d8b001558f65a",
    username: 'John_Doe',
    firstName: 'Иван',
    surName: 'Иванов',
    middleName: 'Иванович',
    image: '/storage/img/default.png',
    permission: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    },
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5MzI4MDkwMH0.signature_here',
    accessTokenExpiredAt: 1793280900000
  };

  console.log("[POST REFRESH_TOKEN]");
}