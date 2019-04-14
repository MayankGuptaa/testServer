const mongoose = require('mongoose');
let User = mongoose.model('User', {
    name: String,
    email: String
});

module.exports = { User };