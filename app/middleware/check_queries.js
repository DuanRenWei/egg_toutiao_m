'use strict';
/**
 * 校验请求query参数
 * @return
 */
module.exports = () => {
  return async (ctx, next) => {
    const { cate_id, page, limit } = ctx.query;

    page && Object.assign(ctx.query, { page: Math.max(parseInt(page), 0) });
    limit && Object.assign(ctx.query, { limit: Math.min(parseInt(limit), 10) });
    cate_id && Object.assign(ctx.query, { cate_id: parseInt(cate_id) });

    for (const key in ctx.query) {
      if (Object.is(ctx.query[key], NaN)) {
        ctx.throw(400, `${key} 参数不合法！`);
      }
    }

    await next();
  };
};
