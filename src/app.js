import 'dotenv/config';

import Koa from 'koa';
import logger from "koa-logger";
import { bodyParser } from "@koa/bodyparser";
import { koaSwagger } from 'koa2-swagger-ui';
import serve from 'koa-static';
import path from 'node:path';

import { router } from './api/v1.0/index.js';
import swaggerDoc from './swagger/index.swagger.js';
import { errorHandler } from './services/errorHandler.js';
import { PROJECT_ROOT } from './config/storage.js';

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(errorHandler());
app.use(logger());

app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: { spec: swaggerDoc },
    persistAuthorization: true
  }),
);

app.use(bodyParser());

app.use(serve(path.join(PROJECT_ROOT, 'public')));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));