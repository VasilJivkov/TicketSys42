const apiRoutes = require('./all.routes');
const authRoutes = require('./auth.routes');

const init = (app, data) => {
    authRoutes.init(app, data);
    apiRoutes.init(app, data);
};

module.exports = {
    init,
};