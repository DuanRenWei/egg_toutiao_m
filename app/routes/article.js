'use strict';
module.exports = app => {
  const { router, controller } = app;
  const { list } = controller.article;
  const { checkQueries } = app.middleware;
  const articleRouter = router.namespace('/api/v1/article');

  // 所有分类列表
  articleRouter.get('/', checkQueries(), list);
};
