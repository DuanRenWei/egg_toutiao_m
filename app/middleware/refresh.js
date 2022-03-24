const CodeResponse = require('../code_response')
const { verify } = require('jsonwebtoken')

module.exports = (opts, app) => {
  return async (ctx, next) => {
    // 请求头获取token
    const { authorization = '' } = ctx.header
    const token = authorization.replace('Bearer ', '')

    // 解析token
    let user = {}
    try {
      user = verify(token, ctx.app.config.jwt.secret_key)
      if (!user.is_refresh) {
        ctx.helper.responseMsg(CodeResponse.JSONWEBTOKENERROR)
      }
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError': ctx.helper.responseMsg(CodeResponse.TOKENEXPIREDERROR)
        default: ctx.helper.responseMsg(CodeResponse.JSONWEBTOKENERROR)
      }
    }

    // 比对 refresh_token
    const { id } = user
    const cacheRefreshToken = await ctx.service.cache.get(`${ctx.app.config.jwt.refresh_key}${id}`)
    if (cacheRefreshToken !== token) {
      ctx.helper.responseMsg(CodeResponse.JSONWEBTOKENERROR)
    }

    // 检查用户是否被禁用
    user = await ctx.service.user.findOneByWhere({ id })
    if (!user) {
      ctx.helper.responseMsg(CodeResponse.USER_WAS_DISABLED)
    }

    // 重新生成 access_token 和 refresh_token
    const { access_token, refresh_token } = await ctx.service.user.getAccessToken(user.id)
    ctx.state.refresh = { access_token, refresh_token }

    await next()
  }
}