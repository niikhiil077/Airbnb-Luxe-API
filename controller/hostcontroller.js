

//local modules

const Home = require('../model/data')


//add home controllerr

const addhomeController = (req, res, next) => {
    res.render('addhome', { editMode: false, isloggedIn: req.session.isloggedIn , user:req.session.user });
}

//host/homeadded controller

const homeaddedController = (req, res, next) => {

    const { houseName, price, location, description, photoUrl } = req.body;

    const home = new Home({ houseName, price, location, description, photoUrl });

    home.save().then(() => {
        console.log('data saved succeessfully')
    }).catch(err => {
        console.log(err);
    });

    res.render('homeadded', { isloggedIn: req.session.isloggedIn , user:req.session.user});

}

//edit home controller

const edithomeController = (req, res, next) => {
    const id = req.params.id;
    Home.findById(id).then((home) => {
        res.render('addhome', { editMode: true, home: home, isloggedIn: req.session.isloggedIn , user:req.session.user });
    }).catch(err => {
        console.log(err);
    })
}

//POST EDITHOME


const edithomeController2 = (req, res, next) => {
    const id = req.params.id;
    const { houseName, price, location, description, photoUrl } = req.body;
    Home.findById(id).then((home) => {
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.description = description;
        home.photoUrl = photoUrl;
        home.save().then(() => {
            console.log('Home updated succesfully');
        }).catch(err => {
            console.log('Home not saved');
        })
        res.redirect('/host/homelist');
    }).catch(err => {
        console.log(err);
    })

}

//host/deletehome controller

const deletehomeController = (req, res, next) => {
    const id = req.params.id;
    Home.findByIdAndDelete(id).then(() => {
        res.redirect('/host/homelist');
    }).catch(err => {
        console.log('file not deleted', err);
    })

}



module.exports = { addhomeController, homeaddedController, edithomeController, deletehomeController, edithomeController2 };