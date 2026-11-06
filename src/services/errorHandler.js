export function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || err.statusCode || 500;

      console.error('[GLOBAL ERROR]', err);

      const isProduction = process.env.NODE_ENV === 'production';
      const safeMessage = ctx.status === 500
        ? 'Внутренняя ошибка сервера. Пожалуйста, повторите попытку позже.'
        : err.message;

      await ctx.render('error.pug', {
        message: safeMessage,
        status: ctx.status,
        error: isProduction ? { status: ctx.status } : err
      });

      ctx.app.emit('error', err, ctx);
    }
  }
}