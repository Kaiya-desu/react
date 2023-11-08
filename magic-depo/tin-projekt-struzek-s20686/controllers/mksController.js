const MksRepository = require('../repository/mysql2/MksRepository');
const MageRepository = require('../repository/mysql2/MageRepository');
const SpellRepository = require("../repository/mysql2/SpellRepository");


exports.showMKSList = (req, res, next) => {
    MksRepository.getMKSs().then(mkss => {
        res.render('pages/mage_know_spell/list',
            {
                mkss: mkss,
                navLocation: 'mks'
            })
    });
}

exports.showAddMKSForm = (req, res, next) => {
    let allMages, allSpells;
    MageRepository.getMages()
        .then(mages =>{
            allMages = mages;
            return SpellRepository.getSpells();
        })
        .then(spells => {
        allSpells = spells;
        res.render('pages/mage_know_spell/form', {
            mks: {},
            formMode: 'createNew',
            allMages: allMages,
            allSpells: allSpells,
            pageTitle: 'Mage know NEW spell',
            formAction: '/mks/add',
            navLocation: 'mks',
            validationErrors: [],
            currMage: null,
            currSpell: null
        });
    });

}

exports.showEditMKSForm = (req, res, next) => {
    let mksValue, allMages, allSpells;
    const mksID = req.params.MksID;
    MksRepository.getMKSById(mksID).then(mks => {
        mksValue = mks;
        return MageRepository.getMages()}).then(mages =>{
            allMages = mages;
            return SpellRepository.getSpells();
        }).then(spells => {
            allSpells = spells
            res.render('pages/mage_know_spell/form', {
                mks: mksValue,
                formMode: 'edit',
                allMages: allMages,
                allSpells: allSpells,
                pageTitle: 'MKS edit',
                btnLabel: 'Edit MKS',
                formAction: '/mks/edit',
                navLocation: 'mks',
                validationErrors: [],
                currMage: mksValue.mage.MageID,
                currSpell: mksValue.spell.SpellID,
            });
        });

}


exports.showMKSDetails = (req, res, next) => {
    let mksValue, allMages, allSpells;
    const mksID = req.params.MksID;
    MksRepository.getMKSById(mksID).then(mks => {
        mksValue = mks;
        return MageRepository.getMages()}).then(mages =>{
        allMages = mages;
        return SpellRepository.getSpells();
    }).then(spells => {
        allSpells = spells
        res.render('pages/mage_know_spell/form', {
            mks: mksValue,
            formMode: 'showDetails',
            allMages: allMages,
            allSpells: allSpells,
            pageTitle: 'MKS details',
            formAction: '/mks/edit',
            navLocation: 'mks',
            validationErrors: [],
            currMage: mksValue.mage.MageID,
            currSpell: mksValue.spell.SpellID
        });
    });

}

exports.addMKS = (req, res, next) => {
    let allMages, allSpells;
    const mksData = { ...req.body };
    MageRepository.getMages()
        .then(mages =>{
            allMages = mages;
            return SpellRepository.getSpells();
        }).then(spells => {
            allSpells = spells;
            return MksRepository.createMKS(mksData)
        .then( result => {
            res.redirect('/mks');
        }).catch(err => {
        res.render('pages/mage_know_spell/form',{
            mks: mksData,
            allMages: allMages,
            allSpells: allSpells,
            formMode: 'createNew',
            pageTitle: 'Mage know NEW spell',
            formAction: '/mks/add',
            navLocation: 'mks',
            validationErrors: err.details,
            currMage: mksData.Mage_MageID,
            currSpell: mksData.Spell_SpellID
        });
    });
    });
}

exports.updateMKS = (req, res, next) => {
    const mksID = req.body.MksID;
    let allMages, allSpells;
    const mksData = { ...req.body };
        MageRepository.getMages()
            .then(mages =>{
                allMages = mages;
                return SpellRepository.getSpells();
            }).then(spells => {
                allSpells = spells;
                return MksRepository.updateMKS(mksID, mksData)
            }).then( result => {
                res.redirect('/mks');
            }).catch(err => {
            res.render('pages/mage_know_spell/form',{
                mks: mksData,
                formMode: 'edit',
                allMages: allMages,
                allSpells: allSpells,
                pageTitle: 'MKS edit',
                btnLabel: 'Edit MKS',
                formAction: '/mks/edit',
                navLocation: 'mks',
                validationErrors: err.details,
                currMage: mksData.Mage_MageID,
                currSpell: mksData.Spell_SpellID
            });
        });
}

exports.deleteMKS = (req, res, next) => {
    const mksID = req.params.MksID;
    MksRepository.deleteMKS(mksID)
        .then( result => {
            res.redirect('/mks');
        });
}