const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

// Coach Routes
router.get('/coaches', coachController.getCoaches);
router.post('/coaches', coachController.createCoach);
router.get('/coaches/:id', coachController.getCoachById);
router.put('/coaches/:id', coachController.updateCoach);
router.delete('/coaches/:id', coachController.deleteCoach);

module.exports = router;
