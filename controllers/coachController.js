const Coach = require('../models/coach');
const Team = require('../models/team');

exports.getCoaches = (req, res) => {
  Coach.find()
    .then(coaches => {
      res.status(200).json({
        success: true,
        message: 'Coaches retrieved successfully',
        data: coaches
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving coaches',
        error: error.message
      });
    });
};

exports.createCoach = async (req, res) => {
  try {
    const { firstName, lastName, nationality, dateOfBirth, image, email, phoneNumber, address, playingCareer, coachingCareer, trophies, teamId } = req.body;
    const team = await Team.findById(teamId);
    if (teamId && !team) {
      return res.status(400).json({ error: 'Invalid team ID' });
    }
    const newCoach = await Coach.create({
      firstName,
      lastName,
      nationality,
      dateOfBirth,
      image,
      email,
      phoneNumber,
      address,
      playingCareer,
      coachingCareer,
      trophies,
      team: team ? team._id : null
    });
    res.status(201).json(newCoach);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id).populate('team');
    if (!coach) {
      return res.status(404).json({ error: 'Koç bulunamadı' });
    }
    res.status(200).json(coach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCoach = (req, res, next) => {
  const id = req.params.id;
  const coachData = req.body;

  Coach.findOneAndUpdate(
    { _id: id },
    coachData,
    { new: true }
  )
    .then(coach => {
      if (!coach) {
        return res.status(404).json({ error: 'Coach not found' });
      }
      res.status(200).json({ coach: coach });
    })
    .catch(err => next(err));
};

exports.deleteCoach = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCoach = await Coach.findByIdAndDelete(id);
    if (!deletedCoach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    res.status(200).json({ message: 'Coach deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
