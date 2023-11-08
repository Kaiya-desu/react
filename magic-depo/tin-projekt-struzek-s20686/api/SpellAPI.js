const spellRepository = require('../repository/mysql2/SpellRepository');

exports.getSpells = (req, res, next) => {
    spellRepository.getSpells()
        .then(m => {
            res.status(200).json(m);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getSpellById = (req, res, next) => {
    const spellID = req.params.SpellID;
    spellRepository.getSpellById(spellID)
        .then(m => {
            if (!m) {
                res.status(404).json({
                    message: 'Spell with ID: ' + spellID + ' not found.'
                })
            } else {
                res.status(200).json(m);
            }
        });
};

exports.createSpell = (req, res, next) => {
    spellRepository.createSpell(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            res.status(500).json(err.details);
            next(err);
        });
};

exports.updateSpell = (req, res, next) => {
    const spellID = req.params.SpellID;
    spellRepository.updateSpell(spellID, req.body)
        .then(result => {
            res.status(200).json({ message: 'Spell updated!', Spell: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            res.status(500).json(err.details);
            next(err);
        });
}

exports.deleteSpell = (req, res, next) => {
    const spellID = req.params.SpellID;
    spellRepository.deleteSpell(spellID)
        .then(result => {
            res.status(200).json({ message: 'Removed Spell', Spell: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};