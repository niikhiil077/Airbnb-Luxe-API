const { check, validationResult } = require("express-validator");
const user = require("../model/user");
const bcrypt = require('bcryptjs');


const getSignupcontroller = (req, res, next) => {

    res.render('signup', {
        isloggedIn: req.session.isloggedIn,
        errors: {},
        oldinputs: [],
        user:{}
    });
}

const postSignupcontroller = [

    check('firstname')
        .notEmpty()
        .withMessage('First name is required')
        .trim()
        .isLength({ min: 2 })
        .withMessage('First name must be of atleast 2 characters')
        .matches(/^[a-zA-z\s]+$/)
        .withMessage('First name can only contain letters'),


    check('lastname')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Last name should be atleast of 2 characters')
        .matches(/^[a-zA-z\s]*$/)
        .withMessage('Last name can only contains letters'),


    check('email')
        .isEmail()
        .withMessage('Enter a valid email address')
        .normalizeEmail(),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Password length must be of 8 characters atleasts')
        .matches(/[a-z]/)
        .withMessage('Password must contain a lowercase alphabet')
        .matches(/[A-Z]/)
        .withMessage('Password must contain a upper case alphabet')
        .matches(/[0-9]/)
        .withMessage('Password must contain a numeric value b/w 0-9')
        .matches(/[!@#$%^&*(){}|<>]/)
        .withMessage('Password must contain a special characters')
        .trim(),


    check('confirmpassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password didnt matched!!');
            }

            return true;
        }),


    check('usertype')
        .notEmpty()
        .withMessage('Usertype cannot be empty')
        .isIn(['host', 'user'])
        .withMessage('Invalid user type'),


    check('terms')
        .notEmpty()
        .withMessage('You must agree with terms and condition')
        .custom((value) => {
            if (value !== 'on') {
                throw new Error('You must select on')
            }
   
            return true;
        }),



    (req, res, next) => {
        const { firstname, lastname, email, password ,  usertype, terms } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render('signup', {
                isloggedIn: req.session.isloggedIn,
                errors: errors.array().map(err => err.msg),
                oldinputs: { firstname, lastname, email, usertype, terms },
                user:{}
            })
        }

        bcrypt.hash(password, 12).then(hashedpassword => {
            const User = new user({ firstname, lastname, email, password: hashedpassword, usertype })
            return User.save();
        }).then(() => {
            req.session.isloggedIn = true;
            res.redirect('/login');
        }).catch(err=>{
            return res.render('signup',{
                isloggedIn : req.session.isloggedIn , 
                errors: [err.message],
                oldinputs: { firstname, lastname, email, usertype, terms },
                user:{}
            })
        })


    }]

module.exports = { getSignupcontroller, postSignupcontroller };