const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req,res,next) => {    
    const {user} = req.body.data    
    User.findOne({
        email:user.email
    })
    .exec()
    .then(findUser => {
        if(findUser) return next({
            message:"User with this email is already registered",
            code:409
        })
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            User.create({
                email:user.email,
                password: user.password
            })
            .then(user => {
                res.status(200).json({
                    message:"User singup!"
                })
            })
            .catch(err => next(err))    
        }) 
    })
    .catch(err => next(err)) 
}

exports.login = (req,res,next) => {    
    const {user} = req.body.data
    User.findOne({
        email:user.email
    })
    .exec()
    .then(findUser => {
        if(!findUser) return next({
            message:"User not found",
            code:404
        })
        bcrypt.compare(user.password,findUser.password, (err,result) => {
            if (err) return next(err)  
            if (result) {
                const token = jwt.sign({
                    userId:findUser._id,
                    email:findUser.email
                },process.env.JWT_KEY, {
                    expiresIn:"1h"
                })

                res.status(200).json({
                    message:"Auth seccessful",
                    token
                })  
            }
            else next({
                message:"You entered an incorrect password",
                code:401
            })
        })
    })
    .catch(err => next(err)) 
}