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

router.get('/:campusId/students', function(req, res, next){
	console.log('hello');
	// res.json(req.campus.students);
});

router.get('/:campusId', function(req, res, next){
	Campus.findById(req.params.campusId)
	.then(campus => res.send(campus))
	.catch(next);
});

router.post('/', function(req, res, next){
	Campus.create(req.body)
	.then(campus => res.status(201).json(campus))
	.catch(next);
});

router.put('/:campusId', function (req, res, next) {
  const campusId = req.params.messageId;

  Campus.findById(campusId)
    .then(campus => campus.update(req.body))
    .catch(next);
});

router.delete('/:campusId', function(req, res, next){
  const id = req.params.campusId;

  Campus.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});