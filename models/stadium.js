const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  opened: {
    type: Number,
    required: true
  },
  surface: {
    type: String,
    required: true
  },
  roofType: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }]
});

stadiumSchema.path('capacity').validate(function(value) {
  return value > 0 && value <= 100000;
}, 'Capacity must be between 1 and 100,000');

stadiumSchema.path('surface').validate(function(value) {
  return value === 'Grass' || value === 'Artificial';
}, 'Surface must be "Grass" or "Artificial"');

stadiumSchema.set('toJSON', { virtuals: true });

stadiumSchema.virtual('address').get(function() {
  return this.city + ', ' + this.country;
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = Stadium;
