'use strict';

/**
 * Module dependencies.
 */
var trendsPolicy = require('../policies/trends.server.policy'),
  trends = require('../controllers/trends.server.controller');

module.exports = function (app) {
  // Trends collection routes
  app.route('/api/trends').all(trendsPolicy.isAllowed)
    .get(trends.list)
    .post(trends.create);

  // Single trend routes
  app.route('/api/trends/:trendId').all(trendsPolicy.isAllowed)
    .get(trends.read)
    .put(trends.update)
    .delete(trends.delete);

  // Finish by binding the trend middleware
  app.param('trendId', trends.trendByID);
};
