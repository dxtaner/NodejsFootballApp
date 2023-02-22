const mongoose = require('mongoose');

const footballerSchema = new mongoose.Schema({
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
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  position: {
    type: String,
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
    appearances: Number,
    goals: Number,
    startDate: Date,
    endDate: Date
  }]
});

const Footballer = mongoose.model('Footballer', footballerSchema);

module.exports = Footballer;
