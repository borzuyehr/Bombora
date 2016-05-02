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
  _id: {
    type: Number
  },
  CompanyName: {
    type: String,
    default: '',
    trim: true
  },
  Domain: {
    type: String,
    default: '',
    trim: true
  },
  Size: {
    type: String,
    default: '',
    trim: true
  },
  Industry: {
    type: String,
    default: '',
    trim: true
  },
  Category: {
    type: String,
    default: '',
    trim: true
  },
  Topic: {
    type: String,
    default: '',
    trim: true
  },
  CompositeScore: {
    type: Number,
    default: '',
    trim: true,
    required: 'Score cannot be blank'
  },
  BucketCode: {
    type: Number,
    default: '',
    trim: true
  },
  MetroArea: {
    type: String,
    default: '',
    trim: true,
    required: 'Metro Area cannot be blank'
  },
  MetroCompositeScore: {
    type: Number,
    default: '',
    trim: true
  },
  MetroBucketCode: {
    type: Number,
    default: '',
    trim: true
  },
  DomainOrigin: {
    type: String,
    default: '',
    trim: true
  }

});



mongoose.model('Trend', TrendSchema);



