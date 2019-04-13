exports.throwError = (req,res,next) => {    
    const error = new Error('Page not found')
    error.code = 404
    next(error)
}

exports.sendError = (error, req, res, next) => {
    console.error(error.message)
    
    res.status(error.code || 400)
    res.json({
        error:{
            ...error,
            message:error.message
        }
    })
}