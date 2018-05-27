const mongoose = require( "mongoose" );

/* eslint-disable unicorn/filename-case */

const schema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
  },
  gender: {
    type : Boolean,
    alias: "male",
  },
  age: {
    type  : Number,
    verify: x => x > 0 && x < 100,
  },
  startingAge: {
    type  : Number,
    verify: x => x > 0 && x < 100,
    alias : "startAge",
  },
  time: {
    type  : Number,
    verify: x => x > 0 && x < 1440,
    alias : "timeSpent",
  },
} );

module.exports = mongoose.model( "participants", schema );
