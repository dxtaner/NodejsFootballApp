const express = require('express');
const router = express.Router();
const footballerController = require('../controllers/footballerController');

// Get all footballers
router.get('/footballers', footballerController.getFootballers);

// Create a new footballer
router.post('/footballers', footballerController.createFootballer);

// Get a specific footballer by id
router.get('/footballers/:id', footballerController.getFootballerById);

// Update a specific footballer by id
router.put('/footballers/:id', footballerController.updateFootballer);

// Delete a specific footballer by id
router.delete('/footballers/:id', footballerController.deleteFootballer);

module.exports = router;
