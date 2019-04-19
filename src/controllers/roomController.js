const { Room,SendResponse } = require('../models')
const {response} = require('express')

exports.getRoom = async (req, res = response, next) => {
    
    try {
        const { query } = req
        const mdbRooms = await Room.find(query).exec()
        if (mdbRooms.length <= 0) return next({code:404,message:"Rooms not Found",data:mdbRoom})
        res.status(200).json(new SendResponse(req,"Get room", mdbRooms))

    } catch (e) {
        next({
            code:400,
            message:"roomController.getRoomById:"+e.message,
            data:e
        })
    }
}

exports.getRoomById = async (req, res = response, next) => {
    try {
        const { id } = req.params
        const mdbRoom = await Room.findById(id).exec()
        if (!mdbRoom) return  next({code:404,message:"Room not Found",data:mdbRoom})
        res.status(200).json(new SendResponse(req,"Get room by id", mdbRoom))

    } catch (e) {
        next({
            code:400,
            message:"roomController.getRoomById:"+e.message,
            data:e
        })
    }

}

exports.addRoom = async (req, res = response, next) => {
    try {
        const { room } = req.body.data
        const mdbRoom = await Room.create({
            naem: room.name,
            people: room.people
        })
        res.status(201).json(new SendResponse(req,"Successful addition", mdbRoom))

    } catch (e) {
        next({
            code:400,
            message:"roomController.addRoom:"+e.message,
            data:e
        })
    }

}

exports.updateRoom = async (req, res = response, next) => {
    try {
        const { id } = req.params
        const { data } = req.body
        const mdbRoom = await Room.findByIdAndUpdate(id, { $set: data.room })
        if (!mdbRoom) return  next({code:404,message:"Room not Found",data:mdbRoom})
        res.status(201).json(new SendResponse(req,"Update successful", mdbRoom))

    } catch (e) {
        next({
            code:400,
            message:"roomController.updateRoom:"+e.message,
            data:e
        })
    }

}

exports.deleteRoom = async (req, res = response, next) => {
    try {
        const { id } = req.params
        const mdbRoom = await Room.findByIdAndDelete(id)
        if (!mdbRoom) return next({code:404,message:"Room not Found",data:mdbRoom})
        res.status(200).json(new SendResponse(req,"Deletion successful", mdbRoom))
    } catch (e) {
        next({
            code:400,
            message:"roomController.deleteRoom:"+e.message,
            data:e
        })
    }
}