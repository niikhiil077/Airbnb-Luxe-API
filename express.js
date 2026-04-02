//core modules

const express = require('express');
const app = express();
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const mongooseUrl = "mongodb+srv://nikhil:niikhiil077@nikhilcluster.zndumrx.mongodb.net/airbnb?appName=nikhilcluster"

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded());


const store = new mongodbStore({
    uri: mongooseUrl,
    collection: 'sessions'
})

app.use(session({
    secret: "nikhil secret",
    resave: false,
    saveUninitialized: true,
    store: store
}));


//local modules

const homeroutes = require('./Routes/homeRoutes');
const hostroutes = require('./Routes/hostRoutes');
const homedetailRoute = require('./Routes/homedetailroute');
const { default: mongoose } = require('mongoose');
const loginRoutes = require('./Routes/loginRoute');
const logoutRoutes = require('./Routes/logoutroute');
const { getSignup, postSignup } = require('./Routes/signuproute');
const { getfavHomesRoute, addfavHomeRoute, dltfavHomeroute } = require('./Routes/favourites');



//route handling


app.use(getSignup);
app.use(postSignup);

app.use(loginRoutes.loginGetRouter);
app.use(loginRoutes.loginPostRouter);


app.use(logoutRoutes.postlogoutRouter);

app.use(homeroutes.homepageRouter);
app.use(homeroutes.homelistRouter);
app.use(getfavHomesRoute);
app.use(addfavHomeRoute);
app.use(dltfavHomeroute);

app.use(hostroutes.addhomeRouter);
app.use(hostroutes.homeaddedRouter);
app.use(hostroutes.edithomeRouter);
app.use(hostroutes.postedithomeRouter);

app.use(homedetailRoute);

app.use((req, res, next) => {
    res.status(404).send('<h1>404 error page</h1>');
})

//server 

const PORT = 3008;


mongoose.connect(mongooseUrl).then(() => {

    

    console.log('Mongoose connected');
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    })
}).catch(err => {
    console.log('Failure to mongo db connection', err);
})

