const mongoose = require( "mongoose" );

/* eslint-disable unicorn/filename-case */

const schema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
  },
  age: {
    type  : Number,
    verify: x => x > 0 && x < 81,
  },
  startingAge: {
    type  : Number,
    verify: x => x > 0 && x < 100,
    alias : "startAge",
  },
  time: {
    type  : Number,
    verify: x => x > 0 && x < 1440,
  },
  timestamp: {
    type   : Date,
    default: Date.now,
  },
  services: {
    type: Array,
  },
  silent: {
    type  : Number,
    verify: x => x < 100 && x > 0,
  },
  suitable: {
    type  : Number,
    verify: x => x > 0 && x < 1440,
  },
} );

module.exports = mongoose.model( "participants", schema );
