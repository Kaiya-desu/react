const db = require('../../config/mysql2/db');
const mageSchema = require('../../model/joi/Mage');
const authUtil = require('../../util/authUtils')

exports.getMages = () => {
    return db.promise().query('SELECT * FROM Mage')
        .then( (results,fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch (err => {
            console.log(err);
            throw err;
        })
};

exports.getMageById = (MageID) => {

    const query = `SELECT m.MageID, m.Name, m.Surname, m.Title, m.Certified_date, m.Email, m.Password, m.Role_RoleID,
                            mks.MksID, mks.Learned_date, mks.Mastery_level,
                            s.SpellID, s.Name as SpellName, s.Description, s.Mana_cost
                   FROM Mage m
                            left join Mage_know_spell mks on mks.Mage_MageID = m.MageID
                            left join Spell s on mks.Spell_SpellID = s.SpellID
                   where m.MageID = ?`;

    return db.promise().query(query, [MageID])
        .then ((results, fields) => {
        const firstRow = results [0][0];
        if(!firstRow){
            return {};
        }

        const mage = {
            MageID: parseInt(MageID),
            Name: firstRow.Name,
            Surname: firstRow.Surname,
            Title: firstRow.Title,
            Certified_date: new Date(firstRow.Certified_date.getTime() - (firstRow.Certified_date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
            Email: firstRow.Email,
            Password: firstRow.Password,
            Role: firstRow.Role_RoleID,
            spells: []
        }

        for( let i = 0; i < results[0].length; i++){
            const row = results[0][i];
            if(row.MksID){
                const mks = {
                    MksIDL: row.MksID,
                    Learned_date: new Date(row.Learned_date.getTime() - (row.Learned_date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
                    Mastery_level: row.Mastery_level,
                    spell:{
                        SpellID: row.SpellID,
                        Name: row.SpellName,
                        Mana_cost: row.Mana_cost
                    }
                };
                mage.spells.push(mks);
            }
        }
    return mage;
    })
        .catch(err => {
           console.log(err);
           throw err;
        });
};

exports.createMage = (newMageData) => {

    const vRes = mageSchema.validate(newMageData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    return checkEmailUnique(newMageData.Email)
        .then(emailErr => {
            if(emailErr){
                return Promise.reject(emailErr);
            }
            else{
                const Name = newMageData.Name;
                const Surname = newMageData.Surname;
                const Title = newMageData.Title;
                const Certified_date = newMageData.Certified_date;
                const Email = newMageData.Email;
                const Password = authUtil.hashPassword(newMageData.Password);
                const Role_RoleID = newMageData.Role; //każdy na start jest normal userem, aby zmienić admina trzeba wejśc do DB

                const sql = 'INSERT into Mage (Name, Surname, Title, Certified_date, Email, Password, Role_RoleID) VALUES (?, ?, ?, ?, ?, ?, ?)'
                return db.promise().execute(sql, [Name, Surname, Title, Certified_date, Email, Password, Role_RoleID]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        })


};

exports.updateMage = (MageID, mageData) => {

    const vRes = mageSchema.validate(mageData, { abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    const Name = mageData.Name;
    const Surname = mageData.Surname;
    const Title = mageData.Title;
    const Certified_date = mageData.Certified_date;
    const Role_RoleID = mageData.Role;

    const sql = `UPDATE Mage set Name = ?, Surname = ?, Title = ?, Certified_date = ?, Role_RoleID = ? where MageID = ?`;
    return db.promise().execute(sql, [Name, Surname, Title, Certified_date, Role_RoleID, MageID]);
};

exports.deleteMage = (MageID) => {
    const sql1 = 'DELETE FROM Mage_know_spell WHERE Mage_MageID = ?';
    const sql2 = 'DELETE FROM Mage WHERE MageID = ?';

    return db.promise().execute(sql1, [MageID])
        .then(() => {
            return db.promise().execute(sql2, [MageID])
        });
};

checkEmailUnique = (Email, MageID) => {
    let sql, promise;
    if(MageID){
        sql = `SELECT COUNT(1) as c FROM Mage WHERE MageID != ? AND Email = ?`;
        promise = db.promise().query(sql, [MageID, Email]);
    }else{
        sql = `SELECT COUNT(1) as c FROM Mage WHERE Email = ?`
        promise = db.promise().query(sql, [Email]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0){
            err = {
                details: [{
                    path: ['Email'],
                    message: 'usedEmail'
                }]
            };

            //return res.status(500).send({message: "This email is already in DB"})
            return err;
        }
        err = 0;
        return err;
    });
}

exports.findByEmail = (Email) => {
    const query = `SELECT MageID, Name, Surname, Email, Password, Role_RoleID FROM Mage WHERE Email = ?`;
    return db.promise().query(query, [Email])
        .then ((results, fields) => {
        const firstRow = results [0][0];
        if(!firstRow){
            return false;
        }
        const mage = {
            MageID: firstRow.MageID,
            Name: firstRow.Name,
            Surname: firstRow.Surname,
            Email: firstRow.Email,
            Password: firstRow.Password,
            Role: firstRow.Role_RoleID
        }

        return mage;
    })
        .catch(err => {
            console.log(err);
            throw err;
        });
}