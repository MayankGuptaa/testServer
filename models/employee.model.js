const mongoose = require('mongoose');

let Employee = mongoose.model('Employee', {
    name: String,
    position: String,
    office: String,
    salary: Number
});

module.exports = { Employee };