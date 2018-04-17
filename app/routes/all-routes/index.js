const apiRoutes = require('./all.api.routes');

const init = (app, data) => {
    apiRoutes.init(app, data);
};

module.exports = {
    init,
};