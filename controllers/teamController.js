const Team = require('../models/team');
const Coach = require('../models/coach');
const Stadium = require('../models/stadium');
const Footballer = require('../models/footballer');

exports.getTeams = async function (req, res, next) {
    try {
        const teams = await Team.find().populate("coach").populate("stadium").populate("players");
        res.json({ success: true, data: teams });
    } catch (err) {
        next(err);
    }
};

exports.createTeam = async function (req, res, next) {
    try {
        const { stadiumId, playerID, coachId } = req.body;
        let coach = null;
        if (coachId) {
            coach = await Coach.findById(coachId);
            if (!coach) {
                return res.status(400).json({ success: false, message: 'Invalid coach ID' });
            }
        }
        let stadium = null;
        if (stadiumId) {
            stadium = await Stadium.findById(stadiumId);
            if (!stadium) {
                return res.status(400).json({ success: false, message: 'Invalid stadium ID' });
            }
        }
        let player = null;
        if (playerID) {
            player = await Footballer.findById(playerID);
            if (!player) {
                return res.status(400).json({ success: false, message: 'Invalid player ID' });
            }
        }
        const existingTeam = await Team.findOne({ name: req.body.name });
        if (existingTeam) {
            return res.status(400).json({ success: false, message: 'Team already exists' });
        }
        const team = new Team({
            name: req.body.name,
            location: req.body.location,
            stadium: stadium ? stadiumId : null,
            coach: coach ? coachId : null,
            founded: req.body.founded,
            championships: req.body.championships,
            logoUrl: req.body.logoUrl,
            players: player ? player : null
        });
        const newTeam = await team.save();
        res.json(newTeam);
    } catch (err) {
        next(err);
    }
};

exports.getTeamById = async (req, res) => {
    const { id } = req.params;

    try {
        const team = await Team.findById(id).populate('stadium').populate("coach").populate("players");

        if (!team) {
            return res.status(404).json({ message: 'team not found' });
        }

        res.status(200).json({ success: true, data: team });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updateTeam = async (req, res) => {
    const id = req.params.id;
    const teamData = req.body;

    Team.findOneAndUpdate(
        { _id: id },
        teamData,
        { new: true }
    )
        .then(team => {
            if (!team) {
                return res.status(404).json({ success: false, error: 'team not found' });
            }
            res.status(200).json({ team: team });
        })
        .catch(err => next(err));
};

exports.deleteTeam = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedTeam = await Team.findByIdAndDelete(id);
        if (!deletedTeam) {
            return res.status(404).json({ success: false, message: 'deletedTeam not found' });
        }
        res.status(200).json({ success: true, message: 'deletedTeam deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};