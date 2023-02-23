const Footballer = require('../models/footballer');
const Team = require('../models/team');

exports.getFootballers = async (req, res) => {
    try {
        const footballers = await Footballer.find().populate('team');
        res.status(200).json({ success: true, data: footballers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createFootballer = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, teamId } = req.body;

        const existingFootballer = await Footballer.findOne({
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth
        });

        if (existingFootballer) {
            return res.status(400).json({ message: 'Footballer already exists' });
        }

        let team = null;
        if (teamId) {
            team = await Team.findById(teamId);
            if (!team) {
                return res.status(400).json({ message: 'Invalid team ID' });
            }
        }

        const footballer = new Footballer({
            firstName: firstName,
            lastName: lastName,
            nationality: req.body.nationality,
            dateOfBirth: dateOfBirth,
            height: req.body.height,
            weight: req.body.weight,
            position: req.body.position,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            image: req.body.image,
            playingCareer: req.body.playingCareer,
            team: teamId ? teamId : null
        });

        const savedFootballer = await footballer.save();
        res.status(201).json(savedFootballer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getFootballerById = async (req, res) => {
    const { id } = req.params;

    try {
        const footballer = await Footballer.findById(id).populate('team');

        if (!footballer) {
            return res.status(404).json({ message: 'Footballer not found' });
        }

        res.status(200).json({ success: true, data: footballer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateFootballer = async (req, res) => {
    const id = req.params.id;
    const footballerData = req.body;

    Footballer.findOneAndUpdate(
        { _id: id },
        footballerData,
        { new: true }
    )
        .then(footballer => {
            if (!footballer) {
                return res.status(404).json({ error: 'footballer not found' });
            }
            res.status(200).json({ footballer: footballer });
        })
        .catch(err => next(err));
};

exports.deleteFootballer = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedfootballer = await Footballer.findByIdAndDelete(id);
        if (!deletedfootballer) {
            return res.status(404).json({ message: 'Footballer not found' });
        }
        res.status(200).json({ message: 'Footballer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchFootballers = async (req, res) => {
    try {
        const { firstName, position } = req.query;
        const footballers = await Footballer.find({
            firstName: { $regex: firstName, $options: 'i' },
            position: { $regex: position, $options: 'i' }
        }).populate('team');
        res.json(footballers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addTeamToFootballer =  async (req, res) => {
    try {
        const { footballerId } = req.params;
        const { teamName } = req.body;
        const footballer = await Footballer.findById(req.params.footballerId);
        if (!footballer) {
            return res.status(404).json({ message: 'footballer not found' });
        }
        const existingTeam = await Team.findOne({ name: teamName });
        if (!existingTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        if (existingTeam.footballer) {
            return res.status(400).json({ message: 'Team already has a footballer' });
        }
        existingTeam.footballer = footballer;
        await existingTeam.save();
        res.json({ message: 'footballer added to team successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
