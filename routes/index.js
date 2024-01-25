const express = require('express');
const router = express.Router();
const Controller = require('../controllers')

const doctorRouter = require('./doctorRouter');


const isLogin = function(req, res, next) {
    const {userEmail} = req.session
    if(userEmail === undefined){
        next()
    }else{
        res.redirect(`/home`)
    }
}
//dashboard
router.get('/', isLogin, Controller.welcome);

//register form
router.get('/register', isLogin, Controller.registerForm);
router.post('/register', Controller.registerPost);

//login form
router.get('/login', isLogin, Controller.loginForm);
router.post('/login', Controller.loginPost);

//logout
router.get('/logout', Controller.logout);

router.use((req, res, next) => {
    const {userEmail} = req.session
    if(!userEmail){
        const error = 'Mohon untuk login terlebih dahulu'
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})

//bisa di akses oleh pasien & dokter
router.get('/home', Controller.home);


router.use((req, res, next) => {
    const {userRole} = req.session
    if(userRole === 'doctor'){
        const error = 'fitur ini hanya bisa di-akses oleh pasien!'
        res.redirect(`/home?error=${error}`)
    }else{
        next()
    }
})

//after login user
router.get('/editProfile', Controller.editProfile);
router.post('/editProfile', Controller.editProfilePost);
router.get('/appointments', Controller.appointments);
router.get('/logout', Controller.logout);

//per-dokteran
router.use('/doctors', doctorRouter);

module.exports = router