const express = require('express')
const router = express.Router()

const {checkAuth} = require('../middleware')

const {roomController} = require('../controllers')
// Get all rooms
router.get('/', roomController.getRoom )

// Get for one room by name(id)
router.get('/:name',checkAuth,roomController.getRoomById )

// Add room
router.post('/', checkAuth, roomController.addRoom)

// Update room data
router.patch('/:name', checkAuth,roomController.updateRoom )

// Delete one room
router.delete('/:name', checkAuth, roomController.deleteRoom)


module.exports = router