const rankRepository = require('../repository/mysql2/RankRepository');

exports.getRank = (req, res, next) => {
    rankRepository.getRanks()
        .then(m => {
            res.status(200).json(m);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.createRank = (req, res, next) => {
    rankRepository.createRank(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};