const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const tokens = req.headers.authorization ? req.headers.authorization.split(" ") : []
        if (tokens[0].toLowerCase() !== "bearer") throw new Error("invalid token")
        const decoded = jwt.verify(tokens[1], process.env.JWT_KEY)
        req.userData = decoded
        next();
    } catch (error) {
        next({
            code: 401,
            message: "checkAuth:" + error.message,
            data: error
        })
    }
}