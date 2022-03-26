'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const Article = app.model.define('article', {
    title: {
      type: STRING,
    },
    desc: {
      type: STRING,

    },
    pic: {
      type: STRING,

    },
    content: {
      type: STRING,

    },
    cate_id: {
      type: INTEGER,
    },
    user_id: {
      type: INTEGER,
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

  Article.associate = function() {
    Article.belongsTo(app.model.User);
    Article.belongsTo(app.model.Category, {
      foreignKey: 'cate_id',
    });
  };


  return Article;
};
