const express = require('express')
const router = express.Router()

const {checkAuth} = require('../middleware')

const {roomController} = require('../controllers')
// Get all rooms
router.get('/', roomController.getRoom )

// Get for one room by name(id)
router.get('/:id',checkAuth,roomController.getRoomById )

// Add room
router.post('/', checkAuth, roomController.addRoom)

// Update room data
router.patch('/:id', checkAuth,roomController.updateRoom )

// Delete one room
router.delete('/:id', checkAuth, roomController.deleteRoom)


module.exports = router