'use strict'

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const User = app.model.define('user', {
    username: {
      type: STRING
    },
    password: {
      type: STRING
    },
    mobile: {
      type: STRING
    },
    login_time: {
      type: DATE
    },
    login_ip: {
      type: STRING
    },
    created_at: {
      type: DATE
    },
    updated_at: {
      type: DATE
    },
    deleted_at: {
      type: DATE
    }
  })

  return User
}