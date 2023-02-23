const express = require('express');
const router = express.Router();
const stadiumController = require('../controllers/stadiumController');

// stadium Routes
router.get('/stadiums', stadiumController.getStadiums);
router.post('/stadiums', stadiumController.createStadium);
router.get('/stadiums/:id', stadiumController.getStadiumById);
router.put('/stadiums/:id', stadiumController.updateStadium);
router.delete('/stadiums/:id', stadiumController.deleteStadium);
router.post('/stadiums/:stadiumId/addTeam', stadiumController.addTeamToStadium);

module.exports = router;
