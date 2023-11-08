const MageRepository = require('../repository/mysql2/MageRepository')
const config = require('../config/auth/key')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const email = req.body.Email
    const password = req.body.Password

    MageRepository.findByEmail(email)
        .then(user =>{
            if(!user){
                return res.status(401).send({message: "wrongEmail"})
            }
            bcrypt.compare(password, user.Password)
                .then(isEqual => {
                    if(!isEqual){
                        return res.status(401).send({message: "wrongPassword"})
                    }
                    const token = jwt.sign({
                        Email: user.Email,
                        UserID: user.MageID,
                        Role: user.Role
                    },
                        config.secret,
                        {expiresIn: '1h'}
                    )

                    res.status(200).json({
                        token: token,
                        Email: user.Email,
                        UserID: user.MageID,
                        Role: user.Role
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}
