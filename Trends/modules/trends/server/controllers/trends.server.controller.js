'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Trend = mongoose.model('Trend'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a trend
 */
exports.create = function (req, res) {
  var trend = new Trend(req.body);
  trend.user = req.user;

  trend.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trend);
    }
  });
};

/**
 * Show the current trend
 */
exports.read = function (req, res) {
  res.json(req.trend);
};

/**
 * Update a trend
 */
exports.update = function (req, res) {
  var trend = req.trend;

  trend.topic = req.body.topic;
  trend.state = req.body.state;
  trend.strength = req.body.strength;

  trend.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trend);
    }
  });
};

/**
 * Delete a trend
 */
exports.delete = function (req, res) {
  var trend = req.trend;

  trend.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trend);
    }
  });
};

/**
 * List of Trends
 */
exports.list = function (req, res) {
  Trend.find().sort('-created').populate('user', 'displayName').exec(function (err, trends) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trends);
    }
  });
};

/**
 * Trend middleware
 */
exports.trendByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Trend is invalid'
    });
  }

  Trend.findById(id).populate('user', 'displayName').exec(function (err, trend) {
    if (err) {
      return next(err);
    } else if (!trend) {
      return res.status(404).send({
        message: 'No trend with that identifier has been found'
      });
    }
    req.trend = trend;
    next();
  });
};
