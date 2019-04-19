
const {SendResponse} = require('../models')
module.exports = (req,res,next) => {        
    res.status(404).json(new SendResponse(req,"Error:Page not found",{
        message:"Page not found"
    }))
}