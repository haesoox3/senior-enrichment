'use strict'

const router = require('express').Router();
module.exports = router;

router.use('/campus', require('./campus'));
router.use('/student', require('./student'));