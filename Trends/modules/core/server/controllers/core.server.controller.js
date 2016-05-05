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
        } },

        ],
    function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
        }
    }
    
  );

Trend.aggregate([
        {$limit: 100000},
        { $match: {$or: [{'Metro Area':{$regex: 'alabama'}},
                         {'Metro Area':{$regex: 'alaska'}},
                         {'Metro Area':{$regex: 'arizona'}},
                         {'Metro Area':{$regex: 'arkansas'}},
                         {'Metro Area':{$regex: 'california'}},
                         {'Metro Area':{$regex: 'colorado'}}, 
                         {'Metro Area':{$regex: 'connecticut'}},
                         {'Metro Area':{$regex: 'delaware'}},
                         {'Metro Area':{$regex: 'florida'}},
                         {'Metro Area':{$regex: 'georgia'}},
                         {'Metro Area':{$regex: 'hawaii'}},
                         {'Metro Area':{$regex: 'idaho'}},
                         {'Metro Area':{$regex: 'illinois'}},
                         {'Metro Area':{$regex: 'indiana'}},
                         {'Metro Area':{$regex: 'iowa'}},
                         {'Metro Area':{$regex: 'kansas'}},
                         {'Metro Area':{$regex: 'kentucky'}},
                         {'Metro Area':{$regex: 'louisiana'}},
                         {'Metro Area':{$regex: 'maine'}},
                         {'Metro Area':{$regex: 'maryland'}},
                         {'Metro Area':{$regex: 'massachusetts'}},
                         {'Metro Area':{$regex: 'michigan'}},
                         {'Metro Area':{$regex: 'minnesota'}},
                         {'Metro Area':{$regex: 'mississippi'}},
                         {'Metro Area':{$regex: 'missouri'}},
                         {'Metro Area':{$regex: 'montana'}},
                         {'Metro Area':{$regex: 'nebraska'}},
                         {'Metro Area':{$regex: 'nevada'}},
                         {'Metro Area':{$regex: 'new hampshire'}},
                         {'Metro Area':{$regex: 'new jersey'}},
                         {'Metro Area':{$regex: 'new mexico'}},
                         {'Metro Area':{$regex: 'new york'}},
                         {'Metro Area':{$regex: 'north carolina'}},
                         {'Metro Area':{$regex: 'north dakota'}},
                         {'Metro Area':{$regex: 'ohio'}},
                         {'Metro Area':{$regex: 'oklahoma'}},
                         {'Metro Area':{$regex: 'oregon'}},
                         {'Metro Area':{$regex: 'pennsylvania'}},
                         {'Metro Area':{$regex: 'rhode island'}},
                         {'Metro Area':{$regex: 'south carolina'}},
                         {'Metro Area':{$regex: 'south dakota'}},
                         {'Metro Area':{$regex: 'tennessee'}},
                         {'Metro Area':{$regex: 'texas'}},
                         {'Metro Area':{$regex: 'utah'}},
                         {'Metro Area':{$regex: 'vermont'}},
                         {'Metro Area':{$regex: 'virginia'}},
                         {'Metro Area':{$regex: 'washington'}},
                         {'Metro Area':{$regex: 'west virginia'}},
                         {'Metro Area':{$regex: 'wisconsin'}},
                         {'Metro Area':{$regex: 'wyoming'}}
                         ] } },
        { $group: {
          _id: {'Metro Area': '$Metro Area'},
          AverageCompositeScore: {$avg: '$Composite Score'}
        } },],
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
