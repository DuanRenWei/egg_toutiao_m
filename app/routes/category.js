'use strict';
module.exports = app => {
  const { router, controller } = app;
  const { findAll } = controller.category;
  const cateRouter = router.namespace('/api/v1/category');

  // 所有分类列表
  cateRouter.get('/', findAll);
};
