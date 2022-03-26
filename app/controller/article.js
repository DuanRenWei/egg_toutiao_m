'use strict';

const BaseController = require('./base');


class ArticleController extends BaseController {
  /**
   * 文章列表
   * 1. 根据关键词搜索，用户登录 && 存储用户搜索纪录
   * 2. 根据分类id搜索
   * 3. 分页
   * 4. 排序
   */
  async list() {
    const res = await this.service.article.findByWhere(this.ctx.query);
    this.success(res);
  }
}

module.exports = ArticleController;
