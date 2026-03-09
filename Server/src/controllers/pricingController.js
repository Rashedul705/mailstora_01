const Pricing = require('../models/Pricing');
const baseController = require('./baseController');

exports.getAll = baseController.getAll(Pricing);
exports.getOne = baseController.getOne(Pricing);
exports.create = baseController.create(Pricing);
exports.update = baseController.update(Pricing);
exports.remove = baseController.remove(Pricing);
