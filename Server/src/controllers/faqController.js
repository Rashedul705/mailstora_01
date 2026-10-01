const FAQ = require('../models/FAQ');
const baseController = require('./baseController');

exports.getAll = baseController.getAll(FAQ);
exports.getOne = baseController.getOne(FAQ);
exports.create = baseController.create(FAQ);
exports.update = baseController.update(FAQ);
exports.remove = baseController.remove(FAQ);
