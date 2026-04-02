//localmodules

const Home = require('../model/data')


//homee detailss...


const homedetailController = (req, res, next) => {
    const id = req.params.id;
    Home.findById(id).then((home) => {
        res.render('homedetails', { id: id, home: home, isloggedIn: req.session.isloggedIn , user:req.session.user} );
    }).catch(err => {
        console.log(err);
    })
}

module.exports = homedetailController;