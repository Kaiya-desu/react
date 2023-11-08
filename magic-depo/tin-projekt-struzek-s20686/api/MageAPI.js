const mageRepository = require('../repository/mysql2/MageRepository');

exports.getMages = (req, res, next) => {
    mageRepository.getMages()
        .then(m => {
            res.status(200).json(m);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getMageById = (req, res, next) => {
    const mageID = req.params.MageID;
    mageRepository.getMageById(mageID)
        .then(m => {
            if (!m) {
                res.status(404).json({
                    message: 'Mage with ID: ' + mageID + ' not found.'
                })
            } else {
                res.status(200).json(m);
            }
        });
};

exports.createMage = (req, res, next) => {
    mageRepository.createMage(req.body)
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

exports.updateMage = (req, res, next) => {
    const mageID = req.params.MageID;
    mageRepository.updateMage(mageID, req.body)
        .then(result => {
            res.status(200).json({ message: 'Mage updated!', Mage: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            res.status(500).json(err.details);
            next(err);
        });
}

exports.deleteMage = (req, res, next) => {
    const mageID = req.params.MageID;
    mageRepository.deleteMage(mageID)
        .then(result => {
            res.status(200).json({ message: 'Removed Mage', Mage: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};