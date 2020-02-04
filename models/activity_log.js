var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var activityLogSchema  = new Schema({
  phone: { type: String, required: true},
  linkwhats: String,
  nome: String,
  status: String,
},
{
    timestamps: true
});
var ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
module.exports = ActivityLog;