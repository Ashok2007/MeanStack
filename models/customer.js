var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        accountNumber: String
    },{ versionKey: false });

module.exports = mongoose.model('Customer', customerSchema);