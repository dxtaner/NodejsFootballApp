const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  image: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  },
  playingCareer: [{
    team: String,
    position: String,
    appearances: Number,
    goals: Number,
    startDate: Date,
    endDate: Date
  }],
  coachingCareer: [{
    team: String,
    position: String,
    startDate: Date,
    endDate: Date
  }],
  trophies: [{
    name: String,
    year: Number,
    team: String
  }]
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;
