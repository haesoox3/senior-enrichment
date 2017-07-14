'use strict'

const express = require('express');
const router = new express.Router();
const models = require('../../db/models');
const Student = models.Student;
module.exports = router;

router.get('/', function(req, res, next){
	Student.findAll()
	.then(students => res.send(students))
	.catch(next);
});

router.get('/:campusId/students', function(req, res, next){
	Student.findAll({
		where:{
			campusId: req.params.campusId
		}
	})
	.then(students => res.send(students))
	.catch(next);
})

router.get('/:studentId', function(req, res, next){
	Student.findById(req.params.studentId)
	.then(student => res.send(student))
	.catch(next);
});

router.post('/', function(req, res, next){
	Student.create(req.body)
	.then(student => res.status(201).json(student))
	.catch(next);
});

router.put('/:studentId', function(req, res, next){
	console.log('hitting first one?')
	const studentId = req.params.studentId;
	Student.update(req.body, {where: {id : studentId}, returning: true})
	.then(student => res.status(200).json(student))
	.catch(next);
});

router.delete('/:studentId', function(req, res, next){
  const id = req.params.studentId;

  Student.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});