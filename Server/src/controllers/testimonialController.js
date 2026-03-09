const Testimonial = require('../models/Testimonial');
const baseController = require('./baseController');

exports.getAll = baseController.getAll(Testimonial);
exports.getOne = baseController.getOne(Testimonial);
exports.create = baseController.create(Testimonial);
exports.update = baseController.update(Testimonial);
exports.remove = baseController.remove(Testimonial);
