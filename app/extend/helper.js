'use strict'
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')
const CodeResponse = require('../code_response')
const HttpException = require('../http_exception')

module.exports = {
  responseMsg(responseData, data = null) {
    throw new HttpException(responseData, data)
  },

  success(data = null) {
    return this.responseMsg(CodeResponse.SUCC, data)
  },

  fail(codeRes = CodeResponse.FAIL) {
    return this.responseMsg(codeRes)
  },

  // 24小时差值
  getDiffSeconds() {
    const today = dayjs()
    const tomorrow = dayjs().add(1, 'day')
    return -today.diff(tomorrow, 's')
  },

  // 生成token
  getToken(payload, expir = this.config.jwt.access_expir) {
    return jwt.sign(payload, this.config.jwt.secret_key, { expiresIn: expir })
  }
}