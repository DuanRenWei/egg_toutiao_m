'use strict';
const Service = require('egg').Service;

class CategoryService extends Service {

  async findAll({ limit }) {
    limit = parseInt(limit);
    const opts = {};
    limit && Object.assign(opts, { limit });
    const res = await this.app.model.Category.findAll(opts);
    return res ? res : null;
  }

  // 收藏分类
  async collections(category_id) {
    const user_id = await this.service.user.getUserId();
    const [ user, created ] = await this.app.model.UserCategory.findOrCreate({
      where: {
        user_id,
        category_id,
      },
      defaults: {
        user_id,
        category_id,
      },
    });
    return { user, created };
  }

  // 取消收藏
  async unCollection(category_id) {
    const user_id = await this.service.user.getUserId();
    return await this.app.model.UserCategory.destroy({
      where: {
        user_id,
        category_id,
      },
    });
  }
}

module.exports = CategoryService;
