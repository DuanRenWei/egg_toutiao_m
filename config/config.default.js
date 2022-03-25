/* eslint valid-jsdoc: "off" */

'use strict';
require('dotenv').config();

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1648091078843_3259';

  // 关闭 csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // validator
  config.valparams = {
    locale: 'zh-cn',
    throwError: true,
  };

  // redis
  config.redis = {
    client: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PWD,
      db: process.env.REDIS_DB,
    },
  };

  // mysql
  config.sequelize = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PWD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    timezone: '+08:00',
    define: {
      freezeTableName: true, // 关闭复数表名
      paranoid: true, // 生成 deleted_at 软删字段
      underscored: true, // 驼峰转下划线
      createdAt: 'created_at', // 自定义创建时间字段
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  };

  // 消息队列配置
  config.bus = {
    debug: true, // Debug 模式下会打印更多日志信息
    concurrency: 1, // Bull 中队列处理的并发数：https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueprocess
    listener: {
      ignore: null, // 忽略目录中的某些文件，https://eggjs.org/zh-cn/advanced/loader.html#ignore-string
      baseDir: 'listener',
      options: { // Bull Job 配置： https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
        attempts: 5,
        backoff: {
          delay: 3000,
          type: 'fixed',
        },
      },
    },
    job: {
      // 与 listener 一致，唯一不同的就是 默认 baseDir 的值为 `job`
    },
    bull: { // Bull 队列配置：https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queue
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: process.env.REDIS_DB,
      },
    },

    queue: {
      default: process.env.QUEUE_NAME, // 默认队列名称
      prefix: process.env.QUEUE_PREFIX, // 队列前缀
    },
  };

  // jwt
  config.jwt = {
    secret_key: process.env.JWT_SECRET_KEY,
    access_expir: 60 * 60 * 10,
    refresh_expir: 60 * 60 * 24 * 7,
    access_key: 'access_token_',
    refresh_key: 'refresh_token_',
  };

  // add your middleware config here
  config.middleware = [
    'errorHandler',
    'auth',
  ];
  config.auth = {
    ignore: [ '/api/v1/auth/login', '/api/v1/auth/get_code', '/api/v1/auth/refresh' ],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
