const db = require('../../config/mysql2/db');

exports.getRanks = () => {
    console.log("Siema jestem w get ranks")
    return db.promise().query('SELECT * FROM `Rank` ORDER BY Turns ASC')
        .then( (results,fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch (err => {
            console.log(err);
            throw err;
        })
}

exports.createRank = (newRankData) => {

    const Email = newRankData.Email;
    const Turns = newRankData.Turns;

    const sql = 'INSERT into `Rank` (Email, Turns) VALUES (?, ?)'
    return db.promise().execute(sql, [Email, Turns]);
};