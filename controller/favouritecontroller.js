
const user = require("../model/user");


const getfavhomeController = async (req, res, next) => {
  const userId = req.session.user._id;
  const User = await user.findById(userId).populate('favourite');
  res.render('favourites', { user: req.session.user, isloggedIn: req.session.isloggedIn, homes: User.favourite });
}

const addfavhomeController = async (req, res, next) => {

  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const User = await user.findById(userId);

  if (!User.favourite.includes(homeId)) {
    User.favourite.push(homeId);
    User.save();
    console.log('home added to favourite succefully');
    res.redirect('/host/favourites');
  }


}

const dltfavhomeController = async (req, res, next) => {

  const userId = req.session.user._id;
  const homeId = req.body.dltid;
  const User = await user.findById(userId);
  if (User.favourite.includes(homeId)) {
    User.favourite = User.favourite.filter((val) => {
      return val != homeId;
    });
    await User.save();
    console.log('fav home deleted');
    res.redirect('/host/favourites');
  }
}

module.exports = { getfavhomeController, addfavhomeController, dltfavhomeController };