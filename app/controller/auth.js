'use strict';

const CodeResponse = require('../code_response');
const BaseController = require('./base');

class AuthController extends BaseController {

  /**
   * 用户登录
   */
  async login() {
    const { ctx } = this
    this.fail()
  }
}

module.exports = AuthController;
