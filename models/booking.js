const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    serviceNumber: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('Booking', bookingSchema);