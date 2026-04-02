//localmodules

const Home = require('../model/data')

//home page controller

const homepageController = (req, res, next) => {
    res.render('homepage', { isloggedIn: req.session.isloggedIn , user:req.session.user});
}

//host/homelist controller

const homelistController = (req, res, next) => {
    Home.find().then((registeredHomes) => {
        if (registeredHomes.length) {
            res.render('homelist', { homes: registeredHomes, isloggedIn: req.session.isloggedIn , user:req.session.user});
            console.log('Data logged succefully form db')
        } else {
            res.render('nohomeadded', { isloggedIn: req.session.isloggedIn , user:req.session.user });
        }
    }).catch(err => {
        console.log('Data logging error', err);
    })

}




module.exports = { homepageController, homelistController};