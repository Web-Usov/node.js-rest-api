const { User,SendResponse } = require('../models')
const {response} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {toCorrectProps} = require('../utils')

exports.signup = async (req, res = response, next) => {
    try {
        const props = toCorrectProps(req.body, ["email","password"])
        const findUser = await User.findOne({
            email: props.email
        }).exec()

        if (findUser) return next({code:409,message:"User with this email is already registered" })
        bcrypt.hash(props.password, 10, async (e, hash) => {
            if (e) return next({code:400, message:e.message, data: e})
            props.password = hash
            await User.create({
                email: props.email,
                password: props.password
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

exports.login = async (req, res = response, next) => {
    try {
        const props = toCorrectProps(req.body, ["email","password"])
        const findUser = await User.findOne({
            email: props.email
        }).exec()

        if (!findUser) return next({code:404,message:"User not found" })
        bcrypt.compare(props.password, findUser.password, (e, result) => {
            if (e) return next({code:400, message:e.message, data: e})
            if (result) {
                const token = jwt.sign({
                    id: findUser._id
                }, process.env.JWT_KEY, {
                        expiresIn: "1d" // Время действия токена
                    })

                    res.status(200).json(new SendResponse(req, "Auth seccessful", {token}))                    
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