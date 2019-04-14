const mogoose = require('mongoose');

mogoose.connect('mongodb://localhost:27017/employesDb', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MonogoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection :' + JSON.stringify(err, undefined, 2))
    }
});

module.exports = mogoose;