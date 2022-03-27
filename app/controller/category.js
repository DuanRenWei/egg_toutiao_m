'use strict';

const CodeResponse = require('../code_response');
const BaseController = require('./base');


class CategoryController extends BaseController {

  async findAll() {
    const res = await this.service.category.findAll(this.ctx.query);
    this.success(res);
  }

  // 获取推荐分类
  async getRecommendChannels() {
    const res = await this.service.category.findAll({ limit: 6 });
    this.success(res);
  }

  // 获取收藏分类
  async getUserCategories() {
    const res = await this.ctx.service.user.getCollectionCategories();
    this.success(res.categories);
  }

  // 收藏分类
  async collections() {
    const id = this.ctx.params.id;
    const { user, created } = await this.ctx.service.category.collections(id);
    if (!created) {
      this.fail(CodeResponse.CATEGORY_ALREADY_EXISTS);
    }
    this.success(user);
  }
  // 取消收藏分类
  async unCollection() {
    const id = this.ctx.params.id;
    const res = await this.ctx.service.category.unCollection(id);
    this.success(res);
  }
}

module.exports = CategoryController;
