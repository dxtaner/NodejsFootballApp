const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// team Routes
router.get('/teams', teamController.getTeams);
router.post('/teams', teamController.createTeam);
router.get('/teams/:id', teamController.getTeamById);
router.put('/teams/:id', teamController.updateTeam);
router.delete('/teams/:id', teamController.deleteTeam);

module.exports = router;
