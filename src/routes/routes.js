var express = require('express'),
    router = express.Router(),
    passport = require('passport'),

    //Index//
    myMenu = require('../controllers/myMenu'),
    wantSame = require('../controllers/wantSame.js'),
    homeController = require('../controllers/home.js'),
    personalAreaController = require('../controllers/personalArea.js'),
    toOrderController = require('../controllers/toOrder.js'),
    checkController = require('../middleware/check.js'),

    //Services//
    servicesController = require('../controllers/services.js'),
    serviceController = require('../controllers/menuPage.js'),
    
    //MenuPage//
    addToShoppingCart = require('../controllers/addToShoppingCart'),
    addOrder = require('../controllers/addOrder'),
    removeFromBasketController = require('../controllers/removeFromBasket.js');
    
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
router.post('/wantAlso', wantSame);
router.post('/mymenu', myMenu);
router.post('/toOrder', toOrderController);

//Services//
router.get('/services', servicesController);

//MenuPage//
router.get('/services/:id', serviceController);
router.post('/removeFromBasket', removeFromBasketController);
router.get('/basket', function (req, res) {
    res.render('/', {order: req.session.order});
});
router.post('/basket', addOrder);
router.post('/orders', addToShoppingCart);

exports.router = router;
