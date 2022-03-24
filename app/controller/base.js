'use strict';

const CodeResponse = require('../code_response');
const HttpException = require('../http_exception');

const Controller = require('egg').Controller;

class BaseController extends Controller {

  codeResponse(responseData, data = null) {
    throw new HttpException(responseData, data)
  }

  success(data = null) {
    return this.codeResponse(CodeResponse.SUCC, data)
  }

  fail(codeRes = CodeResponse.FAIL) {
    return this.codeResponse(codeRes)
  }
}

module.exports = BaseController;
