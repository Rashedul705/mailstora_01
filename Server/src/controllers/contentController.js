const HeroSection = require('../models/HeroSection');
const WebsiteContent = require('../models/WebsiteContent');
const baseController = require('./baseController');

exports.getHero = baseController.getAll(HeroSection);
exports.updateHero = baseController.update(HeroSection);
exports.createHero = baseController.create(HeroSection);
exports.deleteHero = baseController.remove(HeroSection);

exports.getContent = baseController.getAll(WebsiteContent);
exports.updateContent = baseController.update(WebsiteContent);
exports.createContent = baseController.create(WebsiteContent);
exports.deleteContent = baseController.remove(WebsiteContent);
