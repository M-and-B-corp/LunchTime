var ServiceModel = require('../models/service').model;
var DishModel = require('../models/dish').model;

var cityFoodBy = require('./cityFoodBy.json');
var edaBy = require('./edaBy.json');
var nakormimBy = require('./nakormimBy.json');
var pizzatempoBy = require('./pizzaTempoBy.json');

var insertSeed = function (serviceData) {
    // Создали модель с данными
    var service = new ServiceModel(serviceData);
    
    return service.save();
};

module.exports = function seed() {
    console.log('seed loading start');
    ServiceModel.remove({}, function () {
        DishModel.remove({}, function () {
            // Вставляем все службы
            return Promise.all([
                insertSeed(cityFoodBy),
                insertSeed(nakormimBy),
                insertSeed(pizzatempoBy),
                insertSeed(edaBy)
            ]).then(function() {
                console.log('seed loading finished');
            }).catch(function(err) {
                console.log('seed error %s', err);
            });
        });
    });
};
