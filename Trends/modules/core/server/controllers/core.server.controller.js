'use strict';

// Create application rendering ased on states

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Trend = mongoose.model('Trend'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));



  
 Trend.aggregate([
        {$limit: 100000},
        { $match: {'Metro Area':{$regex: 'california'}} },
        { $group: {
          _id: null,
          AverageCompositeScore: {$avg: '$Composite Score'}
        } } ],
    function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
        }
    }
    
  );



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
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  res.render('modules/core/server/views/index', {
    user: req.user || null
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
