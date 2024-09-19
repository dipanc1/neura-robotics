
const mongoose = require('mongoose');

// Define a Launch schema
const launchSchema = new mongoose.Schema({
    flight_number: Number,
    name: String,
    date_utc: String
});

// Create a Launch model
const Launch = mongoose.model('Launch', launchSchema);

module.exports = Launch;