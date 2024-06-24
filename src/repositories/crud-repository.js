const { Logger } = require('../config');

class crudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the crud repo : destroy');
            throw error;
        }
    }


    async get(data) {
        try {
            const response = await this.model.findbyPk(data);
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the crud repo : get');
            throw error;
        }
    }

    async getAll(data) {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the crud repo : get');
            throw error;
        }
    }

    async update(id,data) { // data -> {col: value....} i.e object 
        try {
            const response = await this.model.update(data,{
                where: {
                    id:id
                }
            });
            return response;
        } catch (error) {
            Logger.error('Something went wrong in the crud repo : update');
            throw error;
        }
    }
}

module.exports = crudRepository;
