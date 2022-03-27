'use strict';

const { hashSync } = require('bcryptjs');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    username: {
      type: STRING,
    },
    password: {
      type: STRING,
      set(val) {
        this.setDataValue('password', hashSync(val));
      },
    },
    mobile: {
      type: STRING,
    },
    login_time: {
      type: DATE,
    },
    login_ip: {
      type: STRING,
    },
    status: {
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

  User.associate = function() {
    User.belongsToMany(app.model.Category, { through: app.model.UserCategory });
  };


  return User;
};
