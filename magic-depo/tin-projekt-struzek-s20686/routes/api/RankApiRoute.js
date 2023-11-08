const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth')

const apiRankController = require('../../api/RankAPI')

//dodac isAuth
router.get('/', isAuth, apiRankController.getRank);
router.post('/',  apiRankController.createRank)

module.exports = router;