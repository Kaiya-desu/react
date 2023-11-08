const SpellRepository = require("../repository/mysql2/SpellRepository");

exports.showSpellList = (req, res, next) => {
    SpellRepository.getSpells().then(spells => {
        res.render('pages/spell/list',
            {
                spells: spells,
                navLocation: 'spell'
            })
    });
}

exports.showAddSpellForm = (req, res, next) => {
    res.render('pages/spell/form', {
        spell: {},
        pageTitle: req.__('spell.form.add.pageTitle'),
        formMode: 'createNew',
        formAction: '/spells/add',
        navLocation: 'spell',
        validationErrors: []
    });
}

exports.showEditSpellForm = (req, res, next) => {
    const spellID = req.params.SpellID;
    SpellRepository.getSpellById(spellID).then(spell => {
        res.render('pages/spell/form', {
            spell: spell,
            formMode: 'edit',
            pageTitle: 'Spell edit',
            btnLabel: 'Edit Spell',
            formAction: '/spells/edit',
            navLocation: 'spell',
            validationErrors: [],
            mksMages: spell.mages
        });
    });
}

exports.showSpellDetails = (req, res, next) => {
    const spellID = req.params.SpellID;
    SpellRepository.getSpellById(spellID).then(spell => {
        res.render('pages/spell/form', {
            spell: spell,
            formMode: 'showDetails',
            pageTitle: 'Spell details',
            formAction: '',
            navLocation: 'spell',
            validationErrors: [],
            mksMages: spell.mages
        });
    });
}

exports.addSpell = (req, res, next) => {
    const spellData = { ...req.body };
    SpellRepository.createSpell(spellData)
        .then( result => {
            res.redirect('/spells');
        }).catch(err => {
        res.render('pages/spell/form',{
            spell: spellData,
            pageTitle: req.__('spell.form.add.pageTitle'),
            formMode: 'createNew',
            formAction: '/spells/add',
            btnLabel: req.__('spell.form.add.btnLabel'),
            navLocation: 'spell',
            validationErrors: err.details
        });
    });
}

exports.updateSpell = (req, res, next) => {
    const spellID = req.body.SpellID;
    const spellData = { ...req.body };
        SpellRepository.updateSpell(spellID, spellData)
            .then( result => {
                res.redirect('/spells');
            }).catch(err => { SpellRepository.getSpellById(spellID).then(spell => {
            res.render('pages/spell/form',{
                spell: spellData,
                formMode: 'edit',
                pageTitle: 'Spell edit',
                btnLabel: 'Edit Spell',
                formAction: '/spells/edit',
                navLocation: 'spell',
                validationErrors: err.details,
                mksMages: spell.mages
            });
        });
    });
}

exports.deleteSpell = (req, res, next) => {
    const spellID = req.params.SpellID;
    SpellRepository.deleteSpell(spellID)
        .then( result => {
            res.redirect('/spells');
        });
}