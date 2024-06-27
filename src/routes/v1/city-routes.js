const express = require('express');

const { CityController } = require('../../controllers');
const {CityMiddlewares} = require('../../middlewares')
const router = express.Router();


// /api/v1/cities POST
router.post('/',CityMiddlewares.validateCreateRequest,CityController.createCity);

// /api/v1/cities DELETE
router.delete('/:id',CityController.destroyCity);

// /api/v1/cities PATCH
router.patch('/:id',CityMiddlewares.validateCreateRequest,CityController.updateCity);

module.exports = router;
