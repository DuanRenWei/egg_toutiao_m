'use strict';

const BaseController = require('./base');


class CategoryController extends BaseController {

  async findAll() {
    const res = await this.service.category.findAll();
    this.success(res);
  }
}

module.exports = CategoryController;
