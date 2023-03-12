const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  stadium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stadium',
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
  },
  founded: {
    type: Number,
    required: true
  },
  championships: {
    type: Number,
    required: true
  },
  logoUrl: {
    type: String,
    required: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Footballer',
  }]
});

teamSchema.statics.findByName = function(name, callback) {
  return this.findOne({ name }, callback);
};

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
