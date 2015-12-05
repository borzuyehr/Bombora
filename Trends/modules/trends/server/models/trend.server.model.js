'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Trend Schema
 */
var TrendSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  topic: {
    type: String,
    default: '',
    trim: true,
    required: 'Topic cannot be blank'
  },
  state: {
    type: String,
    default: '',
    trim: true,
    required: 'State cannot be blank'
  },
  strength: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Trend', TrendSchema);
