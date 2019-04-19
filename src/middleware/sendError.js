const {SendResponse} = require('../models')
module.exports = (error,req,res,next) => {     
    console.log(`Error: ${error.code}-${error.message}`,error.data);
       
    res.status(error.code || 500).json(new SendResponse(req,`Error:${error.message || ""}`,error.data))
}