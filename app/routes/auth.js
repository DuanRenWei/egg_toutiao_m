'use strict'
module.exports = app => {
  const { router, controller, middleware } = app
  const { login, getCode, getUserInfo, refreshToken, logout } = controller.auth
  const { refresh } = middleware
  const authRouter = router.namespace('/api/v1/auth')

  // 用户登录
  authRouter.post('/login', login)

  // 获取验证码
  authRouter.post('/get_code', getCode)

  // 查看用户信息
  authRouter.get('/user_info', getUserInfo)

  // 刷新 token
  authRouter.put('/refresh', refresh(), refreshToken)

  // 退出登录
  authRouter.delete('/logout', logout)
}