const express = require('express');
const router = express.Router();

const mksApiController = require('../../api/MksAPI');

router.get('/', mksApiController.getMKSs);
router.get('/:MksID', mksApiController.getMKSById);
router.post('/', mksApiController.createMKS);
router.put('/:MksID', mksApiController.updateMKS);
router.delete('/:MksID', mksApiController.deleteMKS);

module.exports = router;
