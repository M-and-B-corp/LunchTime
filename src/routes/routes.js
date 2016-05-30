var express = require('express'),
    router = express.Router(),
    passport = require('passport'),

    //Index//
    homeController = require('../controllers/home.js'),
    personalAreaController = require('../controllers/personalArea.js'),
    toOrderController = require('../controllers/toOrder.js'),
    changePaidController = require('../middleware/changePaidSubscriber.js'),
    removeOrderController = require('../controllers/removeOrder.js'),
    removeSubscriberController = require('../controllers/removeSubscriber.js'),
    
    //Services//
    servicesController = require('../controllers/services.js'),
    menuPageController = require('../controllers/menuPage.js'),

    //PersonalArea//
    setInfoController = require('../controllers/setInfo.js'),

    //MenuPage//
    addToShoppingCart = require('../controllers/addToShoppingCart'),
    preAddOrder = require('../controllers/preAddOrder'),
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
router.post('/changePaid', changePaidController);
router.post('/toOrder', toOrderController);
router.get('/menuPage', menuPageController);
router.post('/removeOrder', removeOrderController);
router.post('/removeSubscriber', removeSubscriberController);

//Personal_area
router.post('/setInfo', setInfoController);

//Services//
router.get('/services', servicesController);

//MenuPage//
router.post('/removeFromBasket', removeFromBasketController);
router.post('/dishCountLess', dishCountLessController);
router.get('/basket', addOrder);
router.post('/preAddOrder', preAddOrder);
router.get('/orders', addToShoppingCart);
router.post('/category', categoryController);

exports.router = router;
