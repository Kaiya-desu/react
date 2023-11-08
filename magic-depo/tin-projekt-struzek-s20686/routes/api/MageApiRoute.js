const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth')
const isAdmin = require('../../middleware/isAdmin')

const mageApiController = require('../../api/MageAPI');

router.get('/', mageApiController.getMages);
router.get('/:MageID', mageApiController.getMageById);
router.post('/',isAuth, mageApiController.createMage);
router.put('/:MageID', isAuth, mageApiController.updateMage);
router.delete('/:MageID', isAdmin, mageApiController.deleteMage);

module.exports = router;

