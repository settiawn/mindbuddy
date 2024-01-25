const { DoctorProfile, User, UserProfile, Appointment } = require('../models/index')
const bcrypt = require('bcryptjs');

class Controller{
    //routing DONE
    static async welcome(req, res){
        try {
            res.render('welcome')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    //perlogin"an
    //routing DONE
    static async registerForm(req, res){
        try {
            res.render('register')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    //routing DONE
    //note : kasih notif kayak alert biar lebih gaming
    static async registerPost(req, res){
        try {
            const {email, password, firstName, lastName, dateOfBirth, gender, address} = req.body
            await User.create({email, password})
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            const {id} = user
            await UserProfile.create({firstName, lastName, dateOfBirth, gender, address, UserId: id})
            res.redirect("/")
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async loginForm(req, res){
        try {
            res.render('login')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async loginPost(req, res){
        try {
            const {email, password} = req.body
            let msg = ''
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(user){
                const apakahValid = bcrypt.compareSync(password, user.password) //true bisa login, false gak bisa login
                if(apakahValid){
                    req.session.userEmail = user.email
                    req.session.userRole = user.role
                    console.log(req.session);

                    msg = 'login berhasil!'
                    return res.redirect(`/home?message=${msg}`)
                }else{
                    msg = 'password salah'
                    return res.redirect(`/login?error=${msg}`)
                }
            }else{
                msg = 'email tidak ditemukan'
                return res.redirect(`/login?error=${msg}`)
            }
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async logout(req, res){
        req.session.destroy((err) => {
            if(err){
                res.redirect(`/home?error=${err.message}`)
            }else{
                res.redirect('/login')
            }
        })
    }

    //after login user
    static async home(req, res){
        try {
            const {userEmail} = req.session
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            switch(user.role){
                case 'patient':
                    const userProfile = await UserProfile.findOne({
                        where: {
                            UserId: user.id
                        }
                    })
                    // res.send(userProfile)
                    res.render('home', {userProfile})
                break;
                case 'doctor':
                    const profile = await DoctorProfile.findOne({
                        where: {
                            UserId: user.id
                        },
                        include: {
                            model: Appointment,
                        }
                    })
                    const appointments = await Appointment.findAll({
                        where: {
                            DoctorProfileId: profile.id
                        }
                    })
                    res.send(profile)
                    // res.render('doctor_details', {profile, appointments})
                break;
            }
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async editProfile(req, res){
        try {
            const {userEmail} = req.session
            const {id} = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            const profile = await UserProfile.findOne({
                where: {
                    UserId: id
                }
            })
            res.render('editProfile', {profile})
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async editProfilePost(req, res){
        try {
            const {firstName, lastName, address} = req.body
            const {userEmail} = req.session
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            const {id} = await UserProfile.findOne({
                where: {
                    UserId: user.id
                }
            })
            await UserProfile.update({firstName, lastName, address}, {where: {id: id}})
            res.redirect('/home')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async appointments(req, res){
        try {
            const {userEmail} = req.session
            const {id} = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            const data = await Appointment.findAll({
                where: {
                    UserId: id
                }
            })
            res.send(data)
            // res.render('my_appointment')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async doctors(req, res){
        try {
            const data = await DoctorProfile.findAll()
            res.send(data)
            // res.render('all_doctors')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    //done
    static async doctorDetail(req, res){
        try {
            const {id} = req.params
            const data = await DoctorProfile.findOne({where: {id}})
            res.send(data)
            // res.render('doctor_details')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async appointmentForm(req, res){
        try {
            res.render('appointment_form')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async appointmentPost(req, res){
        try {
            const {date, cost} = req.body
            const {id} = req.params //id dokter
            const {userEmail} = req.session
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            await Appointment.create({date, cost, DoctorProfileId: +id, UserId: user.id})
            res.redirect('/appointments')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
}

module.exports = Controller 