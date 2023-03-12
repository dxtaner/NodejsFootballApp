const Coach = require('../models/coach');
const Team = require('../models/team');

exports.getCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find().populate("team");
    res.status(200).json({ success: true, data: coaches, message: 'Coaches fetched successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


exports.createCoach = async (req, res) => {
  try {
    const { firstName, lastName, nationality, dateOfBirth, image, email, phoneNumber, address, playingCareer, coachingCareer, trophies, teamId } = req.body;
    const team = await Team.findById(teamId);
    if (teamId && !team) {
      return res.status(400).json({ success: false, error: 'Invalid team ID' });
    }

    const existingCoach = await Coach.findOne({ email: email });
    if (existingCoach) {
      return res.status(409).json({ success: false, message: 'This coach already exists' });
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
    console.log(team);
    res.status(201).json({ data: newCoach, success: true, message: "Added new coach" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getCoachById = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id).populate('team');
    if (!coach) {
      return res.status(404).json({ success: false, error: 'Coach not Found' });
    }
    res.status(200).json(coach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCoach = async (req, res, next) => {
  try {
    const id = req.params.id;
    const coachData = req.body;
    const coach = await Coach.findOneAndUpdate({ _id: id }, coachData, { new: true });
    if (!coach) {
      return res.status(404).json({ error: 'Coach not found', success: false });
    }
    res.status(200).json({ coach: coach, success: true, message: "coach updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteCoach = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCoach = await Coach.findByIdAndDelete(id);
    if (!deletedCoach) {
      return res.status(404).json({ message: 'Coach not found', success: false });
    }
    res.status(200).json({ message: 'Coach deleted successfully', success: true, data: deletedCoach });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

exports.addTeamToCoach = async (req, res) => {
  try {
    const { teamName } = req.body;
    const coach = await Coach.findById(req.params.coachId);
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found', success: false });
    }
    const existingTeam = await Team.findOne({ name: teamName });
    if (!existingTeam) {
      return res.status(404).json({ message: 'Team not found', success: false });
    }
    if (existingTeam.coach) {
      return res.status(400).json({ message: 'Team already has a coach', success: false });
    }
    existingTeam.coach = coach;
    await existingTeam.save();
    res.json({ message: 'Coach added to team successfully', success: true, data: existingTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
}