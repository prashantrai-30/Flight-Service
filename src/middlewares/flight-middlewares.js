const {StatusCodes} = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next) {
    if(!req.body.flightNumber) {
        ErrorResponse.message = 'Something went wrong while craeting flight';
        ErrorResponse.error =  new AppError( ['flightNumber not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    
    if(!req.body.airplaneId) {
        ErrorResponse.message = 'Something went wrong while craeting flight';
        ErrorResponse.error =  new AppError( ['airplaneId not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    
    if(!req.body.depertureAirportId) {
        ErrorResponse.message = 'Something went wrong while craeting flight';
        ErrorResponse.error =  new AppError( ['depertureAirportId not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId) {
        ErrorResponse.message = 'Something went wrong while craeting flight';
        ErrorResponse.error =  new AppError( ['arrivalAirportId not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrivalTime) {
        ErrorResponse.message = 'Something went wrong while craeting flight';
        ErrorResponse.error =  new AppError( ['arrivalTime not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.depertureTime) {
        ErrorResponse.message = 'Something went wrong while craeting flight';
        ErrorResponse.error =  new AppError( ['depertureTime not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.price) {
        ErrorResponse.message = 'Something went wrong while craeting flight';
        ErrorResponse.error =  new AppError( ['price not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.totalSeats) {
        ErrorResponse.message = 'Something went wrong while craeting flight';
        ErrorResponse.error =  new AppError( ['totalSeats not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function validateUpdateSeatRequest(req,res,next) {
    if(!req.body.seats) {
        ErrorResponse.message = 'Something went wrong while updating seat';
        ErrorResponse.error =  new AppError( ['Seats not found in incoming request in correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = { 
    validateCreateRequest,
    validateUpdateSeatRequest
}