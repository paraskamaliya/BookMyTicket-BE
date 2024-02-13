const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    gender: String,
    bookings: Array,
}, {
    versionKey: false
})
const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };