'use strict'
// imports
const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
// controllers
const SessionController = require('./controllers/SessionController')
const DashboardController = require('./controllers/DashboardController')
const SpotController = require('./controllers/SpotController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')
// variables
const routes = express.Router()
const upload = multer(uploadConfig)

//
//routes.get('/', )

// sessions
routes.post('/sessions', SessionController.store)

// dashboard
routes.get('/dashboard', DashboardController.show)

// spots
routes.get('/spots', SpotController.index)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)

routes.post('/spots/:spot_id/bookings', BookingController.store)

routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)


module.exports = routes
