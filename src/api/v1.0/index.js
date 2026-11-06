import Router from '@koa/router';
import authRoute from './routes/auth.js';
import profileRoute from './routes/profile.js';
import usersRoute from './routes/users.js';
import refreshTokenRoute from './routes/refreshToken.js';

const version = process.env.API_VERSION || 'v1.0';
const basePath = `/api/${version}`;

export const router = new Router({ prefix: basePath });

router.get('/', async (ctx) => {
  ctx.body = 'DIGITAL-HUB-API';
});

router.use(authRoute.routes()).use(authRoute.allowedMethods());
router.use('/profile', profileRoute.routes()).use(profileRoute.allowedMethods());
router.use('/users', usersRoute.routes()).use(usersRoute.allowedMethods());