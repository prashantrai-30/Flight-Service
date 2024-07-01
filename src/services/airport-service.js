const { StatusCodes } = require('http-status-codes');

const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new airport object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirports() {
    try {
        const airport = await airportRepository.getAll();
        return airport;
    } catch (error) {
        throw new AppError('cannot fetch data of all the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statusCode);
        }
        throw new AppError('cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airort you requested to delete is not present', error.statusCode);
        }
        throw new AppError('cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data) {
    try {

        const existingAirport = await airportRepository.get(id);
        if (!existingAirport) {
            throw new AppError('Airport not found', StatusCodes.NOT_FOUND);
        }
        await airportRepository.update(id,data);
        const airport = await airportRepository.get(id);
        return airport ;
    } catch (error) {
        console.log(error);
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to update is not present', error.statusCode);
        }

        throw new AppError('Cannot create a new airport object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}