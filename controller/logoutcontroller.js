const postlogoutController = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
}

module.exports = {postlogoutController};