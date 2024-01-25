class Controller{
    static async welcome(req, res){
        try {
            res.render('welcome')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    //perlogin"an
    static async registerForm(req, res){
        try {
            res.render('register')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async registerPost(req, res){
        try {
            res.send("OK")
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
            res.send("OK")
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
            res.render('home')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async editProfile(req, res){
        try {
            res.render('editProfile')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async editProfilePost(req, res){
        try {
            res.send("OK")
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
            res.render('all_doctors')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }

    static async doctorDetail(req, res){
        try {
            res.render('doctor_details')
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