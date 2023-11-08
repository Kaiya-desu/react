const express = require('express');
const router = express.Router();

const spellController = require('../controllers/spellController');

router.get('/', spellController.showSpellList);
router.get('/add', spellController.showAddSpellForm);
router.get('/edit/:SpellID', spellController.showEditSpellForm);
router.get('/details/:SpellID', spellController.showSpellDetails);

router.post('/add', spellController.addSpell);
router.post('/edit', spellController.updateSpell);
router.get('/delete/:SpellID', spellController.deleteSpell);

module.exports = router;