'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {

  async findAll() {
    const res = await this.app.model.Category.findAll();
    console.log(res);
    return res ? res : null;
  }
}

module.exports = CategoryService;
