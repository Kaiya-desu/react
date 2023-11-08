const MageRepository = require('../repository/mysql2/MageRepository');

exports.showMageList = (req, res, next) => {
    MageRepository.getMages().then(mages => {
        res.render('pages/mage/list',
            {
                mages: mages,
                navLocation: 'mage'
            })
    })
}

exports.showAddMageForm = (req, res, next) => {
    res.render('pages/mage/form', {
        mage: {},
        pageTitle: req.__('mage.form.add.pageTitle'),
        formMode: 'createNew',
        formAction: '/mages/add',
        navLocation: 'mage',
        validationErrors: []
    })
}

exports.showEditMageForm = (req, res, next) => {
    const mageID = req.params.MageID;
    MageRepository.getMageById(mageID).then(mage => {
        res.render('pages/mage/form', {
            mage: mage,
            formMode: 'edit',
            pageTitle: req.__('mage.form.edit.pageTitle'),
            btnLabel: 'Edit mage',
            formAction: '/mages/edit',
            navLocation: 'mage',
            validationErrors: [],
            mksSpells: mage.spells
        });
    });
}

exports.showMageDetails = (req, res, next) => {
    const mageID = req.params.MageID;
    MageRepository.getMageById(mageID).then(mage => {
        res.render('pages/mage/form', {
            mage: mage,
            formMode: 'showDetails',
            pageTitle: 'Mage details',
            formAction: '',
            navLocation: 'mage',
            validationErrors: [],
            mksSpells: mage.spells
        });
    });
}

exports.addMage = (req, res, next) => {
    const mageData = { ...req.body };
    MageRepository.createMage(mageData)
        .then( result => {
            res.redirect('/mages');
        }).catch(err => {
            res.render('pages/mage/form',{
                mage: mageData,
                pageTitle: req.__('mage.form.add.pageTitle'),
                formMode: 'createNew',
                formAction: '/mages/add',
                btnLabel: req.__('mage.form.add.btnLabel'),
                navLocation: 'mage',
                validationErrors: err.details
            });

    });
}

exports.updateMage = (req, res, next) => {
    const mageID = req.body.MageID
    const mageData = { ...req.body };

        MageRepository.updateMage(mageID, mageData)
            .then( result => {
                res.redirect('/mages');
            }).catch(err => { MageRepository.getMageById(mageID).then(mage => {
                res.render('pages/mage/form',{
                    mage: mageData,
                    formMode: 'edit',
                    pageTitle: req.__('mage.form.edit.pageTitle'),
                    btnLabel: req.__('mage.form.edit.btnLabel'),
                    formAction: '/mages/edit',
                    navLocation: 'mage',
                    validationErrors: err.details,
                    mksSpells: mage.spells
            });
        });
    });
}

exports.deleteMage = (req, res, next) => {
    const mageID = req.params.MageID
    MageRepository.deleteMage(mageID)
        .then( result => {
            res.redirect('/mages');
        });
}