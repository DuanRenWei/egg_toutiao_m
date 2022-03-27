'use strict';
module.exports = app => {
  const { router, controller } = app;
  const { getRecommendChannels, getUserCategories, collections, unCollection } = controller.category;
  const cateRouter = router.namespace('/api/v1/category');

  // 获取推荐分类
  cateRouter.get('/recommend', getRecommendChannels);

  // 获取用户收藏的分类
  cateRouter.get('/user_collection', getUserCategories);
  // 收藏分类
  cateRouter.patch('/collection/:id/category', collections);
  // 取消收藏
  cateRouter.delete('/uncollection/:id', unCollection);
};
