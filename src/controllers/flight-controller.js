const { StatusCodes } = require('http-status-codes');

const { FlightService } = require('../services');

const { SuccessResponse, ErrorResponse } = require('../utils/common')
/**
 * POST : /flights
 * req-body {
 * flightNumber:'UK 808'
 * airplaneId:'a380'
 * depertureAirportId:12
 * arrivalAirportId:11
 * arrivalTime:'11-10-00'
 * depertureTime:'09-10-00'
 * price:2000
 * boardingGate:'12A'
 * totalSeats:100
 * }
 */
async function createFlight(req, res) {
    try {
        const airport = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            depertureAirportId: req.body.depertureAirportId,
            arrivalAirportId: req.body. arrivalAirportId,
            arrivalTime: req.body. arrivalTime,
            depertureTime: req.body. depertureTime,
            price: req.body. price,
            boardingGate: req.body. boardingGate,
            totalSeats: req.body. totalSeats,

        });
        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getFlight(req,res) {
    try {
        const Flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = Flight;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}
module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}