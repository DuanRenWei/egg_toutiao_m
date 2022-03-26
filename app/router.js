'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./routes/auth')(app);
  require('./routes/category')(app);
  require('./routes/article')(app);
};
