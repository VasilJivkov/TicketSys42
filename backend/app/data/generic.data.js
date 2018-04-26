class Data {
    constructor(Model, includes = []) {
        this.Model = Model;
        this.includes = this.includes;
    }

    getAll() {
        return this.Model.findAll();
    }

    getById(id) {
        return this.Model.findById(id, {
            includes: this.includes,
        });
    }

    getOneByCriteria(findObj) {
        return this.Model.findOne({
            where: findObj,
        });
    }

    getAllByCriteria(findObj) {
        return this.Model.findAll({
            where: findObj,
        });
    }

    create(obj) {
        return this.Model.create(obj);
    }

    findOrCreate(obj) {
        return this.Model.findCreateFind({
            where: obj,
        });
    }

    delete(obj) {
        return this.Model.destroy({
            where: obj,
        });
    }
}


module.exports = Data;