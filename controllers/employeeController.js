const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;
let { Employee } = require('../models/employee.model')

// Post Employee Data
router.post('/', (req, res) => {
    let empData = req.body;
    let emp = new Employee(empData);
    // let emp = new Employee({
    //     name: req.body.name,
    //     position: req.body.position,
    //     office: req.body.office,
    //     salary: req.body.salary
    // });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Save Employees:' + JSON.stringify(err, undefined, 2));
        }
    });
});

// Get Employee List 
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Employees:' + JSON.stringify(err, undefined, 2));
        }
    });
});

// Get Employee
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with give id: ${req.params.id}`)
    }
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Employee:' + JSON.stringify(err, undefined, 2));
        }
    });
});

// Edit & Update Employee Detail ( PUT API )
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }
    const emp = {
        name: req.body.name,
        position: req.baseUrl.position,
        office: req.body.office,
        salary: req.body.salary
    }
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employe Update:' + JSON.stringify(err, undefined, 2));
        }
    });
});


// Delete Employee
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }
    Employee.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Employe Update:' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;