const express = require('express');
const router = express.Router();

const mksController = require('../controllers/mksController');

router.get('/', mksController.showMKSList);
router.get('/add', mksController.showAddMKSForm);
router.get('/edit/:MksID', mksController.showEditMKSForm);
router.get('/details/:MksID', mksController.showMKSDetails);

router.post('/add', mksController.addMKS);
router.post('/edit', mksController.updateMKS);
router.get('/delete/:MksID', mksController.deleteMKS);

module.exports = router;