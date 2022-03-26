'use strict';
module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  const Category = app.model.define('category', {
    title: {
      type: STRING,
    },
    desc: {
      type: STRING,

    },
    created_at: {
      type: DATE,
    },
    updated_at: {
      type: DATE,
    },
    deleted_at: {
      type: DATE,
    },
  });

  return Category;
};
