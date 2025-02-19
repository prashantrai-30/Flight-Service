const express = require('express');

const { AirplaneController } = require('../../controllers');

const {AirplaneMiddlewares} = require('../../middlewares');

const router = express.Router();


// /api/v1/airplanes POST
router.post('/', AirplaneMiddlewares.validateCreateRequest, AirplaneController.createAirplane);

// /api/v1/airplanes GET
router.get('/', AirplaneController.getAirplanes);

router.get('/:id',AirplaneController.getAirplane);

// /api/v1/airplanes DELETE
router.delete('/:id',AirplaneController.destroyAirplane);

// /api/v1/airplanes PATCH
router.patch('/:id',AirplaneMiddlewares.validateCreateRequest, AirplaneController.updateAirplane);

module.exports = router;