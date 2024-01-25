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
        try {
            res.send("OK")
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
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
                    res.render('home', {user})
                break;
                case 'doctor':
                    res.render('doctor_details', {user})
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
            res.render('my_appointment')
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
            const profile = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            const user = await UserProfile.findOne({
                where: {
                    UserId: profile.id
                }
            }) ///user.id => id user
            // switch(cost){
            //     case '1':
            //         cost = 30000
            //     break;
            //     case '2':
            //         cost = 60000
            //     break;
            //     case '3':
            //         cost = 90000
            //     break;
            // }
            await Appointment.create({date, cost, DoctorId: +id, UserId: user.id})
            res.send("OK")
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    //after login doctor
    static async infoDoctor(req, res){
        try {
            res.render('doctor_details')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
}

module.exports = Controller