'use strict'
module.exports = app => {
  const { router, controller } = app
  const { login } = controller.auth
  const authRouter = router.namespace('/auth')

  // 用户登录
  authRouter.post('/login', login)
}