const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const routes = require('./routes')
const {error} = require('./middleware')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Cors
app.use((req,res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requsted-With, Content-Type, Accpet, Authorization"
    )
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})


// Routes
app.use('/room',routes.roomsRouters)
app.use('/user',routes.userRouters)

app.get('/', (req,res,next) => {
    res.status(200).json({
        response:{
            project:"REST-full API on Node.js",
            version:"0.0.1",
            author:"Web Usov"
        }
    })
})
// Errors
app.use(error.throwError)
app.use(error.sendError)

module.exports = app