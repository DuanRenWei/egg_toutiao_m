'use strict'

class CodeResponse {
  // 通用状态码
  static SUCC = { errno: 1, status: 200, errmsg: '操作成功' }
  static FAIL = { errno: -1, status: 400, errmsg: '操作失败' }

  // 业务状态码

  /**
   * @title 验证码请求评率太快
   */
  static VERIFICATION_CODE = {errno:10001, status: 400, errmsg: '请求频率太快，请稍后再试...'}

  /**
   * @title 验证码超过当天最大发送次数
   */
  static MAXIMUM_NUMBER_TIMES = {errno:10002, status: 400, errmsg: '验证码超过当天最大发送次数...'}

  /**
   * @title 该手机号已注册
   */
  static PHONE_NUMBER_REGISTERED = {errno:10003, status: 400, errmsg: '该手机号已注册...'}

  /**
   * @title 验证码不正确
   */
  static VERIFICATION_CODE_IS_INCORRECT = {errno:10004, status: 400, errmsg: '验证码不正确...'}
  /**
   * @title token 已过期
   */
  static TOKENEXPIREDERROR = {errno:10005, status: 400, errmsg: 'token已过期...'}
  /**
   * @title token 不合法
   */
  static JSONWEBTOKENERROR = {errno:10006, status: 400, errmsg: 'token不合法...'}

  /**
   * @title 用户已被禁用
   */
  static USER_WAS_DISABLED = {errno:10007, status: 400, errmsg: '用户已被禁用，请联系管理员...'}
}

module.exports = CodeResponse