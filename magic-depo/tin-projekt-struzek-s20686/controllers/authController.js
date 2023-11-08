const MageRepository = require('../repository/mysql2/MageRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.Email;
    const password = req.body.Password;

    MageRepository.findByEmail(email)
        .then(mage => {
            if(!mage){
                res.render('index',{
                    navLocation: '',
                    loginError: "wrongEmail"
                })
            } else if (authUtil.comparePasswords(password, mage.Password) === true){
                req.session.loggedUser = mage;
                res.redirect('/');
            } else {
                res.render('index',{
                    navLocation: '',
                    loginError: "wrongPassword"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

