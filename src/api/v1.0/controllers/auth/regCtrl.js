export async function register(ctx, next) {
  const { username, firstName, surName, middleName, password } = ctx.request.body.data;

  ctx.status = 200;
  ctx.body = {
    id: "60c72b2f9b1d8b001558f65a",
    username,
    firstName,
    surName,
    middleName,
    image: '/uploads/avatars/default.png',
    properties: {
      chat: { C: true, R: true, U: true, D: true },
      news: { C: true, R: true, U: true, D: true },
      settings: { C: true, R: true, U: true, D: true }
    },
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5MzI4MDkwMH0.signature_here',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5NTg3MjkwMH0.signature_here',
    accessTokenExpiredAt: 1793280900000,
    refreshTokenExpiredAt: 1795872900000
  };

  console.log("[POST REGISTRATION]");
}