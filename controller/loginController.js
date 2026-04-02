const user = require("../model/user");
const bcrypt = require("bcryptjs");

const loginGetController = (req, res, next) => {
    res.render('login', {
        isloggedIn: false,
        errors: [],
        oldinputs: {},
        user: {}
    });
}

const loginPostController = async (req, res, next) => {
    const { email, password } = req.body;

    const User = await user.findOne({ email });
    console.log(User);
    if (!User) {
        return res.status(422).render('login', {
            isloggedIn: false,
            errors: ['Invalid email'],
            oldinputs: { email },
            user: {}
        })
    }



    const pass = await bcrypt.compare(password, User.password);
    if (!pass) {
    return res.status(422).render('login', {
        isloggedIn: false,
        errors: ['invalid passowrd'],
        oldinputs: { email },
        user: {}
    })
}




    req.session.isloggedIn = true;
    req.session.user = {
        _id:User._id.toHexString(),
        firstname : User.firstname,
        lastname : User.lastname , 
        email : User.email , 
        usertype : User.usertype 
    };

    await req.session.save(err=>{
        if(err){
        console.log('Error while saving ',err);
        }else{
            console.log('Session saved', req.session);
            res.redirect('/');
        }
    });

    



}

module.exports = { loginGetController, loginPostController };