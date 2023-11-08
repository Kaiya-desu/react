const express = require('express');
const router = express.Router();

const mageController = require('../controllers/mageController');

router.get('/', mageController.showMageList);
router.get('/add', mageController.showAddMageForm);
router.get('/edit/:MageID', mageController.showEditMageForm);
router.get('/details/:MageID', mageController.showMageDetails);

router.post('/add', mageController.addMage);
router.post('/edit', mageController.updateMage);
router.get('/delete/:MageID', mageController.deleteMage);

module.exports = router;