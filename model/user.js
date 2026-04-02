const { default: mongoose } = require("mongoose");


const userschema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'first name is required']
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is must']
    },
    usertype: {
        type: String,
        required: [true, 'usertype is required']
    },
    favourite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home'
    }]
})


module.exports = mongoose.model('user', userschema);