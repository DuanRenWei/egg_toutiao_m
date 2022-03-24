'use strict'

const HttpException = require('../http_exception');

module.exports = (opt, app) => {
  return async (ctx, next) => {
    try {
      await next()
      // 404 处理
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = { error: 'Not Found' }
      }
    } catch (err) {

      // 已知异常
      if (err instanceof HttpException) {
        const { data, errmsg, errno, status } = err
        let errs = { errmsg, errno }
        data && Object.assign(errs, { data })
        ctx.body = errs
        ctx.status = status
        return
      }

      // 未知异常 && 记录错误日志

      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };

      if (status === 422) {
        ctx.body.detail = err.errors;
      }

      ctx.status = status;
    }
  }
}