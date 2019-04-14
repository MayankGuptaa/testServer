const express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
let { User } = require('../models/user.model');


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' '[1])
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send('Unauthrized request')
    }
    req.userId = payload.subject;
    next();
}


router.post('/registration', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, doc) => {
        if (!err) {
            const payload = { subject: doc._id };
            const token = jwt.sign(payload, 'secretKey');
            res.status(200).send({
                type: 'success'
            });
        } else {
            console.log('Error in Registration:' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error);
        } else if (!user) {
            res.status(401).send('Invalid Email')
        } else if (user.password !== userData.password) {
            res.status(401).send('Invalid Password')
        } else {
            const payload = { subject: user._id };
            const token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token });
        }

    })
})

router.get('/user-list', verifyToken, (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Users:' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;
