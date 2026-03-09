const baseController = require('./baseController');
const Customer = require('../models/Customer');

exports.getAll = baseController.getAll(Customer);
exports.getOne = baseController.getOne(Customer);
exports.create = baseController.create(Customer);
exports.update = baseController.update(Customer);
exports.remove = baseController.remove(Customer);
