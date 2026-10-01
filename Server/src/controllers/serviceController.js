const Service = require('../models/Service');
const baseController = require('./baseController');

exports.getAll = baseController.getAll(Service);
exports.getOne = baseController.getOne(Service);
exports.create = baseController.create(Service);
exports.update = baseController.update(Service);
exports.remove = baseController.remove(Service);
