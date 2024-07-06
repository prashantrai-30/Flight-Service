const express = require('express');

const { AirportController } = require('../../controllers');

const {AirportMiddlewares} = require('../../middlewares');

const router = express.Router();

// /api/v1/airports POST
router.post('/',AirportMiddlewares.validateCreateRequest,AirportController.createAirport);

// /api/v1/airports GET
router.get('/', AirportController.getAirports);

router.get('/:id',AirportController.getAirport);

// /api/v1/airports DELETE
router.delete('/:id',AirportController.destroyAirport);

// /api/v1/airports PATCH
router.patch('/:id',AirportMiddlewares.validateCreateRequest, AirportController.updateAirport);

module.exports = router;