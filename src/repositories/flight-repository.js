const {Sequelize} = require('sequelize');

const crudRepository = require('./crud-repository');

const { Flight,Airplane,Airport,City} = require('../models');

const db = require('../models');

const { addRowLockOnflights } = require('./queries');

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

async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction();
    try {
        await db.sequelize.query(addRowLockOnflights(flightId));
        const flight = await Flight.findByPk(flightId);
        if(+dec) {
            await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
        } else {
            await flight.increment('totalSeats', {by: seats}, {transaction:transaction});
        }
        await transaction.commit();
        return flight;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

}

module.exports = FlightRepository;
