var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main' });
})

const LangController = require('../controllers/LangController');
router.get('/changeLang/:lang', LangController.changeLang);

const AuthController = require('../controllers/authController');
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;
