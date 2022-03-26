'use strict';
module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;

  const Search = app.model.define('search', {
    title: {
      type: STRING,
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

  return Search;
};
