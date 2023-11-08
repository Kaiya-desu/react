const db = require('../../config/mysql2/db');
const spellSchema = require("../../model/joi/Spell");

exports.getSpells = () => {
    return db.promise().query('SELECT * FROM Spell')
        .then( (results,fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch (err => {
            console.log(err);
            throw err;
        })
};

exports.getSpellById = (SpellID) => {

    const query = `SELECT  s.SpellID, s.Name, s.Description, s.Mana_cost,
                           mks.MksID, mks.Learned_date, mks.Mastery_level,
                           m.MageID, m.Name as MageName, m.Surname, m.Title, m.Certified_date
                   FROM Spell s
                            left join Mage_know_spell mks on mks.Spell_SpellID = s.SpellID
                            left join Mage m on mks.Mage_MageID = m.MageID
                   where s.SpellID = ?`;

    return db.promise().query(query, [SpellID])
        .then ((results, fields) => {
            const firstRow = results [0][0];
            if(!firstRow){
                return {};
            }

            const spell = {
                SpellID: parseInt(SpellID),
                Name: firstRow.Name,
                Description: firstRow.Description,
                Mana_cost: firstRow.Mana_cost,
                mages: []
            }

            for( let i = 0; i < results[0].length; i++){
                const row = results[0][i];
                if(row.MksID){
                    const mks = {
                        MksIDL: row.MksID,
                        Learned_date: new Date(row.Learned_date.getTime() - (row.Learned_date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
                        Mastery_level: row.Mastery_level,
                        mage:{
                            MageID: row.MageID,
                            Name: row.MageName,
                            Surname: row.Surname,
                            Title: row.Title,
                            Certified_date:  row.Certified_date//new Date(row.Certified_date.getTime() - (row.Certified_date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0]
                        }
                    };
                    spell.mages.push(mks);
                }
            }
            return spell;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createSpell = (newSpellData) => {

    const vRes = spellSchema.validate(newSpellData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }
    return checkNameUnique(newSpellData.Name)
        .then(nameErr => {
            if(nameErr){
                return Promise.reject(nameErr);
            }
            else{
                const Name = newSpellData.Name;
                const Description = newSpellData.Description;
                const Mana_cost = newSpellData.Mana_cost;

                const sql = 'INSERT into Spell (Name, Description, Mana_cost) VALUES (?, ?, ?)'
                return db.promise().execute(sql, [Name, Description, Mana_cost]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        })
    /*
        const Name = newSpellData.Name;
        const Description = newSpellData.Description;
        const Mana_cost = newSpellData.Mana_cost;

        const sql = 'INSERT into Spell (Name, Description, Mana_cost) VALUES (?, ?, ?)'
        return db.promise().execute(sql, [Name, Description, Mana_cost]);

         */
};

exports.updateSpell = (SpellID, spellData) => {

    const vRes = spellSchema.validate(spellData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkNameUnique(spellData.Name, SpellID)
        .then(nameErr => {
            if(nameErr){
                return Promise.reject(nameErr);
            }
            else {
                const Name = spellData.Name;
                const Description = spellData.Description;
                const Mana_cost = spellData.Mana_cost;

                const sql = `UPDATE Spell set Name = ?,Description = ?, Mana_cost = ? WHERE SpellID = ?`;
                return db.promise().execute(sql, [Name, Description, Mana_cost, SpellID]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        })


};


exports.deleteSpell = (SpellID) => {
    const sql1 = 'DELETE FROM Mage_know_spell WHERE Spell_SpellID = ?';
    const sql2 = 'DELETE FROM Spell WHERE SpellID = ?';

    return db.promise().execute(sql1, [SpellID])
        .then(() => {
            return db.promise().execute(sql2, [SpellID])
        });
};

checkNameUnique = (Name, SpellID) => {
    let sql, promise;
    if(SpellID){
        sql = `SELECT COUNT(1) as c FROM Spell WHERE SpellID != ? AND Name = ?`;
        promise = db.promise().query(sql, [SpellID, Name]);
    }else{
        sql = `SELECT COUNT(1) as c FROM Spell WHERE Name = ?`
        promise = db.promise().query(sql, [Name]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0){
            err = {
                details: [{
                    path: ['Name'],
                    message: 'This spell name is already in the DB'
                }]
            };
            return err;
        }
        err = 0;
        return err;
    });
}