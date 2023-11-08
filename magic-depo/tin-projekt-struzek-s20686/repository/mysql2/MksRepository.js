const db = require('../../config/mysql2/db');
const mksSchema = require("../../model/joi/Mks");

exports.getMKSs = () => {
    return db.promise().query(`SELECT mks.MksID, mks.Learned_date, mks.Mastery_level,
                                    m.MageID, m.Name as MageName, m.Surname, m.Title, m.Certified_date,
                                    s.SpellID, s.Name as SpellName, s.Description, s.Mana_cost
                                    FROM Mage_know_spell mks
                                        left join Mage m on mks.Mage_MageID = m.MageID
                                        left join Spell s on mks.Spell_SpellID = s.SpellID`)
        .then( (results,fields) => {
        const mkss = [];
        for(let i = 0; i<results[0].length; i++){
            const row = results[0][i];
            const mks = {
                MksID: row.MksID,
                Learned_date:  new Date(row.Learned_date.getTime() - (row.Learned_date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
                Mastery_level: row.Mastery_level,
                mage:{
                    MageID: row.MageID,
                    Name: row.MageName,
                    Surname: row.Surname,
                    Title: row.Title,
                    Certified_date:  new Date(row.Certified_date.getTime() - (row.Certified_date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0]
                },
                spell:{
                    SpellID: row.SpellID,
                    Name: row.SpellName,
                    Mana_cost: row.Mana_cost
                }
            };
            mkss.push(mks);
        }
        console.log(mkss);
        return mkss;
        })
        .catch (err => {
            console.log(err);
            throw err;
        })
};

exports.getMKSById = (MksID) => {

    const query = `SELECT mks.MksID, mks.Learned_date, mks.Mastery_level,
                          m.MageID, m.Name as MageName, m.Surname, m.Title, m.Certified_date,
                          s.SpellID, s.Name as SpellName, s.Description, s.Mana_cost
                   FROM Mage_know_spell mks
                            left join Mage m on mks.Mage_MageID = m.MageID
                            left join Spell s on mks.Spell_SpellID = s.SpellID
                   where mks.MksID = ?`;

    return db.promise().query(query, [MksID])
        .then ((results, fields) => {
            const row = results [0][0];
            if(!row){
                return {};
            }
            const mks = {
                MksID: row.MksID,
                Learned_date: new Date(row.Learned_date.getTime() - (row.Learned_date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
                Mastery_level: row.Mastery_level,
                mage:{
                    MageID: row.MageID,
                    Name: row.MageName,
                    Surname: row.Surname,
                    Title: row.Title,
                    Certified_date: new Date(row.Certified_date.getTime() - (row.Certified_date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0]
                },
                spell:{
                    SpellID: row.SpellID,
                    Name: row.SpellName,
                    Mana_cost: row.Mana_cost
                }
            };
            console.log(mks);
            return mks;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createMKS = (newMKSData) => {
    const vRes = mksSchema.validate(newMKSData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    const sql = 'INSERT into Mage_know_spell (Mage_MageID, Spell_SpellID, Learned_date, Mastery_level) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [newMKSData.Mage_MageID, newMKSData.Spell_SpellID, newMKSData.Learned_date, newMKSData.Mastery_level]);
};

exports.updateMKS = (MksID, mksData) => {

    const vRes = mksSchema.validate(mksData, { abortEarly: false});
    if(vRes.error){
        console.log(vRes.error)
        return Promise.reject(vRes.error);
    }

    const sql = `UPDATE Mage_know_spell set Mage_MageID = ?, Spell_SpellID = ?, Learned_date = ?, Mastery_level = ? where MksID = ?`;
    return db.promise().execute(sql, [mksData.Mage_MageID, mksData.Spell_SpellID, mksData.Learned_date, mksData.Mastery_level, MksID]);
};

exports.deleteMKS = (MksID) => {
    const sql = 'DELETE FROM Mage_know_spell WHERE MksID = ?';

    return db.promise().execute(sql, [MksID]);
};