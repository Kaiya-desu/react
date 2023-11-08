const express = require('express');
const router = express.Router();

const spellApiController = require('../../api/SpellAPI');

router.get('/', spellApiController.getSpells);
router.get('/:SpellID', spellApiController.getSpellById);
router.post('/', spellApiController.createSpell);
router.put('/:SpellID', spellApiController.updateSpell);
router.delete('/:SpellID', spellApiController.deleteSpell);

module.exports = router;
