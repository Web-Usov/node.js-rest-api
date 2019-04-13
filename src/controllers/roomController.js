const {Room, SendResponse} = require('../models')

exports.getRoom = (req, res, next) => {
    const {query} = req
    Room.find(query)
        .exec()
        .then(rooms => {
            if(rooms.length <= 0) return next({
                message:"Room not found",
                code:404,
            })
            
            res.status(200).json(new SendResponse(req,"Array with rooms", rooms))
        })
        .catch(err => next(err))
}

exports.getRoomById = (req, res, next) => {
    const {id} = req.params
    Room.findById(id)
        .exec()
        .then(room => {
            if(!room) return next({
                message:"Room not found",
                code:404,
            })
            
            res.status(200).json(new SendResponse(req,"Room (by id)", rooms))
        })
        .catch(err => next(err))
}

exports.addRoom = (req, res, next) => {
    const {room} = req.body.data
    Room.create(room)
    .then(room => {        
        res.status(201).json(new SendResponse(req,"Successful addition", room))
    })
    .catch(err => next(err))
}

exports.updateRoom = (req, res, next) => {
    const {id} = req.params
    const {data} = req.body
    Room.findByIdAndUpdate(id, { $set : data.room})
    .then(room => {
        if(!room) return next({
            message:"Room not found",
            code:404,
        })
        
        res.status(201).json(new SendResponse(req,"Update successful", room))
    })
    .catch(err => next(err))
}

exports.deleteRoom = (req, res, next) => {
    const {id} = req.params    
    Room.findByIdAndDelete(id)
        .exec()
        .then(doc => {            
            if(!doc) return next({
                message:"Room not found",
                code:404,
            })
        
            res.status(200).json(new SendResponse(req,"Deletion successful", room))
        })
        .catch(err => next(err))
}