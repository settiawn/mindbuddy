const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

//all doctor
router.get('/', Controller.doctors);

//doctor info after login
router.get('/info', Controller.infoDoctor);

//doctor details view from user
router.get('/:id', Controller.doctorDetail);
router.get('/:id/appointment', Controller.appointmentForm);
router.post('/:id/appointment', Controller.appointmentPost);




module.exports = router