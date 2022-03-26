'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {

  /**
   * 根据条件查询文章列表
   */
  async findByWhere(query) {
    const { keywords, page = 1, limit = 10, order, cate_id } = query;
    const whereOpts = {};
    const { Op } = this.app.Sequelize;
    const offset = (page - 1) * limit;
    // 模糊查询
    keywords && Object.assign(whereOpts, {
      [Op.or]: [
        { title: { [Op.like]: `%${keywords}%` } },
        { desc: { [Op.like]: `%${keywords}%` } },
      ],
    });
    // 排序
    order && Object.assign(whereOpts, { order: [ 'created_at', 'DESC' ] });
    // 分类
    cate_id !== 1 && Object.assign(whereOpts, { cate_id });


    const res = await this.app.model.Article.findAndCountAll({
      where: whereOpts,
      include: [
        {
          model: this.app.model.User,
          attributes: [ 'id', 'username', 'mobile' ],
        },
        {
          model: this.app.model.Category,
          attributes: [ 'id', 'title' ],
        },
      ],
      offset,
      limit,
    });
    return res;
  }
}

module.exports = ArticleService;
