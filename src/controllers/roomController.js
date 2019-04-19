const { Room,SendResponse } = require('../models')
const {response, request} = require('express')
const {toCorrectProps} = require('../utils')

exports.getRoom = async (req, res = response, next) => {
    
    try {
        const props = toCorrectProps(req.query, [], ["filter"])
        const mdbRooms = await Room.find({
            ...props.filter
        }).exec()
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

exports.getRoomById = async (req = request, res = response, next) => {
    try {
        console.log("userData",req.userData);
        
        const props = toCorrectProps(req.params, ["id"])
        const mdbRoom = await Room.findById(props.id).exec()
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
        const props = toCorrectProps(req.body, ["name","people"], ["withKitten"])
        const mdbRoom = await Room.create({
            name: props.name,
            people: props.people,
            withKitten:props.withKitten
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
        const props = toCorrectProps([...req.params,...req.body], ["id"], ["name","people","withKitten"])
        const mdbRoom = await Room.findByIdAndUpdate(props.id, { $set: {
            name:props.name,
            people:props.people,
            withKitten:props.withKitten
        }})
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
        const props = toCorrectProps(req.params, ["id"], ["name","people","withKitten"])
        const mdbRoom = await Room.findByIdAndDelete(props.id)
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