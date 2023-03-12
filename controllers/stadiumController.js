const Stadium = require('../models/stadium');
const Team = require('../models/team');

exports.createStadium = async (req, res) => {
  try {
    const { teamId } = req.body;
    const existingStadium = await Stadium.findOne({ name: req.body.name });
    if (existingStadium) {
      return res.status(400).json({ message: 'Stadium already exists', success: false });
    }

    let team = null;
    if (teamId) {
      team = await Team.findById(teamId);
      if (!team) {
        return res.status(400).json({ message: 'Invalid team ID', success: false });
      }
    }

    const stadium = new Stadium({
      name: req.body.name,
      city: req.body.city,
      country: req.body.country,
      capacity: req.body.capacity,
      opened: req.body.opened,
      surface: req.body.surface,
      roofType: req.body.roofType,
      location: req.body.location,
      team: teamId ? teamId : null
    });

    const savedStadium = await stadium.save();
    res.status(201).json({ message: 'Stadium Added', success: true, data: savedStadium });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', success: false });
  }
};

exports.getStadiums = async (req, res) => {
  try {
    const stadiums = await Stadium.find().populate('teams');
    res.status(200).json({ success: true, data: stadiums, message: "Stadiums retrieved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred while retrieving stadiums." });
  }
};


exports.getStadiumById = async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.id).populate('teams');
    if (!stadium) {
      return res.status(404).json({ success: false, message: "Stadium not found" });
    }
    res.status(200).json({ success: true, data: stadium, message: "Stadium retrieved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateStadium = async (req, res) => {
  try {
    const id = req.params.id;
    const stadiumData = req.body;

    const stadium = await Stadium.findOneAndUpdate(
      { _id: id },
      stadiumData,
      { new: true }
    );

    if (!stadium) {
      return res.status(404).json({ success: false, message: 'Stadium not found' });
    }

    res.status(200).json({ success: true, stadium: stadium, message: 'Stadium updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.deleteStadium = async (req, res, next) => {
  const { id } = req.params;

  try {
    const stadiumData = await Stadium.findByIdAndDelete(id);
    if (!stadiumData) {
      return res.status(404).json({ message: 'Stadium not found', success: false });
    }
    res.status(200).json({ message: 'Stadium deleted successfully', success: true, data: stadiumData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTeamToStadium = async (req, res) => {
  try {
    const { stadiumId } = req.params;
    const { teamName } = req.body;
    const stadium = await Stadium.findById(req.params.stadiumId);
    if (!stadium) {
      return res.status(404).json({ message: 'stadium not found', success: false });
    }
    const existingTeam = await Team.findOne({ name: teamName });
    if (!existingTeam) {
      return res.status(404).json({ message: 'Team not found', success: false });
    }
    if (existingTeam.stadium) {
      return res.status(400).json({ message: 'Team already has a stadium', success: false });
    }
    existingTeam.stadium = stadium;
    await existingTeam.save();
    res.json({ message: 'stadium added to team successfully', success: true, data: stadium });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', success: false });
  }
};
