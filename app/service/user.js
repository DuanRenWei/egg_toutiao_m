'use strict';
const dayjs = require('dayjs');
const random = require('random');

const Service = require('egg').Service;
const CodeResponse = require('../code_response');

class UserService extends Service {

  /**
   * 生成验证码 && 缓存10分钟
   */
  async getCaptcha(mobile) {
    const cache_key = `login_code_${mobile}`
    const code = random.int(100000, 999999)
    await this.service.cache.set(cache_key, code, 600)
    return code
  }

  /**
   * 验证码防刷
   * 1. 1分钟1次
   * 2. 1天10次
   */
  async captchaRateLimit(mobile) {
    const lock_key = `login_code_lock_${mobile}`
    const count_key = `login_code_count_${mobile}`

    const lock = await this.service.cache.add(lock_key, 1, 60)
    if (!lock) {
      this.ctx.helper.fail(CodeResponse.VERIFICATION_CODE)
    }

    if (await this.service.cache.has(count_key)) {
      const count = await this.service.cache.incr(count_key)
      if (count > 10) {
        this.ctx.helper.fail(CodeResponse.MAXIMUM_NUMBER_TIMES)
      }
    } else {
      await this.service.cache.set(count_key, 1, this.ctx.helper.getDiffSeconds())
    }
  }

  /**
   * @title 查询不存在的用户 && 创建
   */
  async findAndCreateUser(mobile) {
    const code = random.int(1000, 9999)
    const res = await this.ctx.model.User.findOrCreate({
      where: {
        mobile,
        status: 1
      },
      defaults: {
        mobile,
        password: 'admin888',
        username: `前端开发者_${code}`,
        login_time: dayjs(),
        login_ip: this.ctx.request.ip
      }
    })
    return res ? res[0].dataValues : null
  }

  /**
   * @title 比对验证码
   * 1. 比对成功，删除所有验证码缓存key
   */
  async comparisonCode(code, mobile) {
    const isPass = parseInt(code) === await this.service.cache.get(`login_code_${mobile}`)
    if (!isPass) {
      this.ctx.helper.fail(CodeResponse.VERIFICATION_CODE_IS_INCORRECT)
    }
    await this.service.cache.remove(`login_code_${mobile}`)
    await this.service.cache.remove(`login_code_lock_${mobile}`)
    await this.service.cache.remove(`login_code_count_${mobile}`)
  }

  /**
   * 生成token && 缓存
   */
  async getAccessToken(userId) {
    const access_key = `${this.app.config.jwt.access_key}${userId}`
    const refresh_key = `${this.app.config.jwt.refresh_key}${userId}`

    const access_token = this.ctx.helper.getToken({ id: userId, is_refresh: false })
    const refresh_token = this.ctx.helper.getToken({ id: userId, is_refresh: true }, this.app.config.jwt.refresh_expir)

    await this.service.cache.set(access_key, access_token, this.app.config.jwt.access_expir)
    await this.service.cache.set(refresh_key, refresh_token, this.app.config.jwt.refresh_expir)

    return {
      access_token,
      refresh_token
    }
  }

  /**
   * 根据条件查询一条用户信息
   */
  async findOneByWhere({ username, password, mobile, status, id }) {
    let where = { status: 1 }
    username && Object.assign(where, { username })
    password && Object.assign(where, { password })
    mobile && Object.assign(where, { mobile })
    status && Object.assign(where, { status })
    id && Object.assign(where, { id })

    const user = await this.ctx.model.User.findOne({
      where
    })

    return user ? user.dataValues : null
  }
}

module.exports = UserService;
