const Portfolio = require('../models/Portfolio');
const baseController = require('./baseController');

exports.getAll = baseController.getAll(Portfolio);
exports.getOne = baseController.getOne(Portfolio);
exports.create = baseController.create(Portfolio);
exports.update = baseController.update(Portfolio);
exports.remove = baseController.remove(Portfolio);
