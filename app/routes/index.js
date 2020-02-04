const textRoutes = require('./text_routes');

module.exports = function(app, db, jobs) {
  textRoutes(app, db, jobs);
};