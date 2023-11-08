const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser){
        next();
    }else{
        throw new Error('unautorized access');
    }
}

// np tylko Admin moze usuwać rekordy
exports.permitAuthenticatedUserAdmin = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser.Role === 1){
        next();
    }else{
        throw new Error('unautorized access');
    }
}