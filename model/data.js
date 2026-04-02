const { default: mongoose } = require("mongoose");

const HomeSchema = mongoose.Schema({
    houseName: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    photoUrl: { type: String },
})

module.exports = mongoose.model('Home', HomeSchema);