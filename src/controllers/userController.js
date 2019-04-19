const { User,SendResponse } = require('../models')
const {response} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res = response, next) => {
    try {
        const { user } = req.body.data
        const findUser = await User.findOne({
            email: user.email
        }).exec()

        if (findUser) return next({code:409,message:"User with this email is already registered" })
        bcrypt.hash(user.password, 10, async (e, hash) => {
            if (e) return next({code:400, message:e.message, data: e})
            user.password = hash
            await User.create({
                email: user.email,
                password: user.password
            })
            res.status(200).json(new SendResponse(req, "User singup!", {}))
        })
    } catch (e) {
        next({
            code:400,
            message:"userController.signup:"+e.message,
            data:e
        })
    }

}

exports.login = (req, res = response, next) => {
    try {
        const { user } = req.body.data
        const findUser = User.findOne({
            email: user.email
        }).exec()

        if (!findUser) return next({code:404,message:"User not found" })
        bcrypt.compare(user.password, findUser.password, (e, result) => {
            if (e) return next({code:400, message:e.message, data: e})
            if (result) {
                const token = jwt.sign({
                    userId: findUser._id,
                    email: findUser.email
                }, process.env.JWT_KEY, {
                        expiresIn: "1d" // Время действия токена
                    })

                    res.status(200).json(new SendResponse(req, "Auth seccessful", token))
            }
            else next({code:401,message:"You entered an incorrect password"}) 
        })
    } catch (e) {        
        next({
            code:400,
            message:"userController.login:"+e.message,
            data:e
        })
    }
    

}