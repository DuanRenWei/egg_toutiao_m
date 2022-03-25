'use strict';

const CodeResponse = require('../code_response');
const BaseController = require('./base');

const rules = {
  mobile: {
    type: 'phone',
    required: true,
  },
  code: {
    type: 'string',
    min: 6,
  },
};

class AuthController extends BaseController {

  /**
   * 用户登录
   * 1. 检查手机号和验证码格式
   * 2. 检查验证码是否正确
   * 2. 如果用户不存在 && 创建新用户
   * 3. 返回access_token 和 refresh_token
   */
  async login() {
    const { ctx } = this;
    const { code, mobile } = ctx.request.body;

    ctx.validate(rules);

    await this.service.user.comparisonCode(code, mobile);

    const { id: userId } = await this.service.user.findAndCreateUser(mobile);
    if (!userId) {
      this.fail(CodeResponse.USER_WAS_DISABLED);
    }

    const { access_token, refresh_token } = await this.ctx.service.user.getAccessToken(userId);

    this.success({
      access_token,
      refresh_token,
    });
  }

  /**
   * 获取验证码
   * 1. 检查手机号格式
   * 2. 生成验证码 && 缓存
   * 3. 验证码防刷
   * 4. 发送验证码短信
   */
  async getCode() {
    const { ctx } = this;
    const { mobile: mobileField } = ctx.request.body;
    const env = ctx.app.config.env === 'prod';

    // 验证手机号格式
    const { mobile } = rules;
    ctx.validate({ mobile });

    // 生成验证码
    const code = await ctx.service.user.getCaptcha(mobileField);
    // 验证码防刷
    await ctx.service.user.captchaRateLimit(mobileField);

    // 发送验证码
    if (!env) {
      this.success({ code });
    }
    this.success({ code });
  }

  /**
   * 查看用户信息
   */
  async getUserInfo() {
    this.success({ ...this.ctx.state.auth });
  }

  /**
   * 刷新token
   */
  async refreshToken() {
    const { access_token, refresh_token } = this.ctx.state.refresh;
    this.success({ access_token, refresh_token });
  }

  /**
   * 退出登录
   */
  async logout() {
    const { id } = this.ctx.state.auth;
    await this.ctx.service.cache.remove(`${this.app.config.jwt.access_key}${id}`);
    await this.ctx.service.cache.remove(`${this.app.config.jwt.refresh_key}${id}`);
    this.success();
  }
}

module.exports = AuthController;
