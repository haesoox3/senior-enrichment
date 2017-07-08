'use strict'

const express = require('express');
const router = new express.Router();
const models = require('../../db/models');
const Campus = models.Campus;
module.exports = router;

router.get('/', function(req, res){
	Campus.findAll()
	.then(campuses => res.send(campuses))
});

router.get('/:campusId', function(req, res){
	Campus.findById(req.params.campusId)
	.then(campus => res.send(campus))
});

router.post('/', function(req, res, next){
	Campus.create(req.body)
	.then(campus => res.status(201).json(campus))
	.catch(next);
});