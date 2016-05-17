var request = require('request'),
    cheerio = require('cheerio'),
    url = 'http://city-food.by',
    DishModel = require('../models/dish').model,
    CategoryModel = require('../models/category').model;

function load(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            var $ = cheerio.load(body);
            if (error) return reject('Не загрузил URL');
            if (error || response.statusCode !== 200) {
                reject('Не загрузил URL');
            }
            resolve($);
        });
    });
}

function findAndSaveDishes(category) {
    return load(url + category.href)
        .then(function ($) {
            return $('.views-row').map(function () {
                return new DishModel({
                    title: $(this).find('.views-field-title span').text(),
                    price: $(this).find('.views-field-sell-price span').text(),
                    category: category.href,
                    image: $(this).find('img').attr('src'),
                    description: $(this).find('.views-field-field-text div').text(),
                    uselfulness: $(this).find('.views-field-field-text2 div').text()
                });
            }).toArray();
        })
        .then(function (dishes) {
            dishes.map(function (dish) {
                return dish.save();
            });
        })
}

module.exports = function () {
    console.log('seed loading start');
    new Promise(function (resolve, reject) {
        CategoryModel.remove({}, function () {
            DishModel.remove({}, function () {
                return resolve();
            });
        });
    })
        .then(function () {
            return load(url);
        })
        .then(function ($) {
            var categories = $('#block-menu-menu-menu-pod-slider .menu .leaf').map(function () {
                return {
                    title: $(this).find('a').text(),
                    href: $(this).find('a').attr('href')
                };
            }).toArray();

            categories.splice(0, 1);
            categories.splice(-1, 1);
            return categories;
        })
        .then(function (categories) {
            var dishes = [];
            Promise.all(categories.map(function (category) {
                return findAndSaveDishes(category, dishes);
            }))
                .then(function () {
                    var categoryModels = categories.map(function (category) {
                        return new CategoryModel({
                            title: category.title,
                            href: category.href,
                            service: url
                        });
                    });
                    categoryModels.map(function (category) {
                        return category.save();
                    });
                })
        })
        .then(function () {
            console.log('seed loading finished');
        }).catch(function (err) {
        console.log('seed error %s', err);
    });
};
