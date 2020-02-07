const express = require('express');
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            res.status(500).json({message: "Could not retrieve cars"});
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('cars').where({ id }).first()
        .then(car => {
            res.status(200).json(car);
        })
        .catch(err => {
            res.status(500).json({message: "Could not retrieve car"});
        });
});

router.post('/', (req, res) => {
    const carData = req.body;

    db('cars').insert(carData)
        .then(car => {
            res.status(201).json(car);
        })
        .catch(err => {
            res.status(500).json({message: "Could not insert car"});
        });
});

module.exports = router;