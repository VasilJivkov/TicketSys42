const Data = require('./generic.data');

class LogsData extends Data {
    constructor(Model, includes = []) {
      super(Model, includes);
    }

    log(title, CompanyId) {
      return this.Model.create({
        title,
        CompanyId,
      });
    }
}

module.exports = LogsData;