var express = require('express'),
    router = express.Router(),
    passport = require('passport'),

    //Index//
    homeController = require('../controllers/home.js'),
    personalAreaController = require('../controllers/personalArea.js'),
    toOrderController = require('../controllers/toOrder.js'),
    checkController = require('../middleware/check.js'),
    removeOrderController = require('../controllers/removeOrder.js'),
    
    //Services//
    servicesController = require('../controllers/services.js'),
    menuPageController = require('../controllers/menuPage.js'),
    
    //MenuPage//
    addToShoppingCart = require('../controllers/addToShoppingCart'),
    addOrder = require('../controllers/addOrder'),
    removeFromBasketController = require('../controllers/removeFromBasket.js'),
    dishCountLessController = require('../controllers/dishCountLess'),
    categoryController = require('../controllers/category');

//Authorisation//
router.get('/auth/fb', passport.authenticate('facebook', {successRedirect: 'back', failureRedirect: '/'}));
router.get('/auth/vk', passport.authenticate('vk', {successRedirect: 'back', failureRedirect: '/'}));
router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});
//TODO: Изменить get logout на POST
//Index//
router.get('/', homeController);
router.get('/personal_area', personalAreaController);
router.post('/check', checkController);
router.post('/toOrder', toOrderController);
router.get('/menuPage?', menuPageController);
router.post('/removeOrder', removeOrderController);

//Services//
router.get('/services', servicesController);

//MenuPage//
router.post('/removeFromBasket', removeFromBasketController);
router.post('/dishCountLess', dishCountLessController);
router.get('/basket', addOrder);
router.post('/orders', addToShoppingCart);
router.post('/category', categoryController);

exports.router = router;
