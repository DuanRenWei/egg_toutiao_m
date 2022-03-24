const CodeResponse = require('../code_response')
const { verify } = require('jsonwebtoken')

/**
 * 用户鉴权
 * 1. 请求头获取token
 * 2. 解析 token || token错误（token过期，token不合法）
 * 3. 判断用户是否登录
 * 4. 判断用户是否禁用
 */
module.exports = (opts, app) => {
  return async (ctx, next) => {
    // 请求头获取token
    const { authorization = '' } = ctx.header
    const token = authorization.replace('Bearer ', '')

    // 解析token
    let user = {}
    try {
      user = verify(token, app.config.jwt.secret_key)
      if (user.is_refresh) {
        ctx.helper.responseMsg(CodeResponse.JSONWEBTOKENERROR)
      }
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError': ctx.helper.responseMsg(CodeResponse.TOKENEXPIREDERROR)
        default: ctx.helper.responseMsg(CodeResponse.JSONWEBTOKENERROR)
      }
    }

    // 检查用户是否登录
    const { id } = user
    const cacheToken = await ctx.service.cache.get(`${app.config.jwt.access_key}${id}`)
    if (cacheToken !== token) {
      ctx.helper.responseMsg(CodeResponse.JSONWEBTOKENERROR)
    }

    // 检查用户是否被禁用
    user = await ctx.service.user.findOneByWhere({ id })
    if (!user) {
      ctx.helper.responseMsg(CodeResponse.USER_WAS_DISABLED)
    }

    // 用户属性挂载全局对象
    const { password, ...rest } = user
    ctx.state.auth = rest

    await next()
  }
}