const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  //trips = DEL-MUM
  if (query.trips) {
    [depertureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.depertureAirportId = depertureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    //TODO: add a check that they are not same
    } 
    try {
        const flights = await flightRepository.getAllFlights(customFilter);
        return flights;
        } catch (error) {
          throw new AppError('cannot fetch data of all the flight', StatusCodes.INTERNAL_SERVER_ERROR);
        }
}

module.exports = {
  createFlight,
  getAllFlights
}
