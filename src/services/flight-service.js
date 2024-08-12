const { StatusCodes } = require("http-status-codes");
const {Op} = require('sequelize');
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
    console.log(error);
    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  const endingtriptime = "23:59:00";
  //trips = DEL-MUM
  if (query.trips) {
    [depertureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.depertureAirportId = depertureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    //TODO: add a check that they are not same
    } 
  if (query.price) {
    [minPrice,maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]:[minPrice, ((maxPrice == undefined)? 20000: maxPrice)]
    }
  }

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers
    }
  }

  if(query.tripdate) {
    customFilter.depertureTime = {
      [Op.gte]: [query.tripdate,query.tripdate+endingtriptime]
    }
  }

  if(query.sort) {
    const params = query.sort.split(',');
    const sortFilters = params.map((param) => param.split('_'));
    sortFilter = sortFilters;
  }
    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
        } catch (error) {
          console.log(error);
          throw new AppError('cannot fetch data of all the flight', StatusCodes.INTERNAL_SERVER_ERROR);
        }
}

async function getFlight(id) {
  try {
    const Flight = await flightRepository.get(id);
    return Flight;
  } catch(error) {
    if(error.statusCodes == StatusCodes.NOT_FOUND) {
      throw new AppError('The flight you requested is not present',error.statusCodes);
    } 
    throw new AppError('Cannot fetch data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError('Cannot update data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
}
