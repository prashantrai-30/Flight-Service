const {Sequelize} = require('sequelize');

const crudRepository = require('./crud-repository');

const { Flight,Airplane,Airport,City} = require('../models');

class FlightRepository extends crudRepository {
    constructor() {
        super(Flight);
    }

async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
        where: filter,
        order: sort ,
        include: [
        {
            model: Airplane,
            as:'airplaneDetail',
            required:true
        },
        {
            model:Airport,
            as:'depertureAirport',
            required: true,
            on : {
                col1: Sequelize.where(Sequelize.col("Flight.depertureAirportId"),"=",Sequelize.col("depertureAirport.code"))
            },
            include: {
                model: City,
                required: true
            }
        },
        {
            model:Airport,
            as:'arrivalAirport',
            required: true,
            on : {
                col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
            },
            include: {
                model: City,
                required: true
            }
        }
    ]
});
    return response;
}
}

module.exports = FlightRepository;
