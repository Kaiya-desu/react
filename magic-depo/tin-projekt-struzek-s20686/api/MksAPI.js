const mksRepository = require('../repository/mysql2/MksRepository');

exports.getMKSs = (req, res, next) => {
    mksRepository.getMKSs()
        .then(m => {
            res.status(200).json(m);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getMKSById = (req, res, next) => {
    const mksID = req.params.MksID;
    mksRepository.getMKSById(mksID)
        .then(m => {
            if (!m) {
                res.status(404).json({
                    message: 'MKS with ID: ' + mksID + ' not found.'
                })
            } else {
                res.status(200).json(m);
            }
        });
};

exports.createMKS = (req, res, next) => {
    mksRepository.createMKS(req.body)
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

exports.updateMKS = (req, res, next) => {
    const mksID = req.params.MksID;
    mksRepository.updateMKS(mksID, req.body)
        .then(result => {
            res.status(200).json({ message: 'MKD updated!', MKS: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            res.status(500).json(err.details);
            next(err);
        });
}

exports.deleteMKS = (req, res, next) => {
    const mksID = req.params.MksID;
    mksRepository.deleteMKS(mksID)
        .then(result => {
            res.status(200).json({ message: 'Removed MKS', MKS: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};