'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  valparams: {
    enable: true,
    package: 'egg-valparams'
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  bus: {
    enable: true,
    package: 'egg-bus',
  }
};
