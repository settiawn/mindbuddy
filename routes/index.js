const express = require('express');
const router = express.Router();
const Controller = require('../controllers')

const doctorRouter = require('./doctorRouter');

//dashboard
router.get('/', Controller.welcome);

//register form
router.get('/register', Controller.registerForm);
router.post('/register', Controller.registerPost);

//login form
router.get('/login', Controller.loginForm);
router.post('/login', Controller.loginPost);

//logout
router.get('/login', Controller.logout);

//after login user
router.get('/home', Controller.home);
router.get('/editProfile', Controller.editProfile);
router.post('/editProfile', Controller.editProfilePost);
router.get('/appointments', Controller.appointments);

//doctor
router.use('/doctors', doctorRouter);

module.exports = router