'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('campus', {
  name: Sequelize.STRING,
  imageUrl: {
    type: DataTypes.VIRTUAL,
    get: function () {
      return `/api/campuses/${this.id}/image`;
    }
})
