'use strict'

const express = require('express');
const router = new express.Router();
const models = require('../../db/models');
const Campus = models.Campus;
module.exports = router;

router.get('/', function(req, res, next){
	Campus.findAll()
	.then(campuses => res.send(campuses))
	.catch(next);
});

router.get('/:campusId', function(req, res, next){
	Campus.findById(req.params.campusId)
	.then(campus => res.send(campus))
	.catch(next);
});

router.get('/:campusId/students', function(req, res, next){
	console.log('HELLO', req);
	console.log('hi', req.campus)
	res.json(req.campus.students);
})

router.post('/', function(req, res, next){
	Campus.create(req.body)
	.then(campus => res.status(201).json(campus))
	.catch(next);
});