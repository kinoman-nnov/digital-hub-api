export async function refreshToken(ctx, next) {
  // const { username, password } = ctx.request.body.data;

  ctx.status = 200;
  ctx.body = {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5MzI4MDkwMH0.signature_here',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImV4cCI6MTc5NTg3MjkwMH0.signature_here',
    accessTokenExpiredAt: 1793280900000,
    refreshTokenExpiredAt: 1795872900000
  };

  console.log("[POST REFRESH_TOKEN]");
}