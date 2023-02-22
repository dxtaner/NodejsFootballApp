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
        const footballer = new Footballer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            dateOfBirth: req.body.dateOfBirth,
            height: req.body.height,
            weight: req.body.weight,
            position: req.body.position,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            image: req.body.image,
            playingCareer: req.body.playingCareer,
            team: req.body.team || null
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