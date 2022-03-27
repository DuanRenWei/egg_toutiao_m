'use strict';
module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const UserCategory = app.model.define('user_category', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: INTEGER,
    },
    category_id: {
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

  return UserCategory;
};
