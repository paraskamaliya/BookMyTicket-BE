const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    title: String,
    poster: String,
    duration: String,
    category: Array,
    rating: Number,
    date: String,
    description: String,
    languages: Array
}, {
    versionKey: false
})
const MovieModel = mongoose.model("movie", movieSchema);
module.exports = { MovieModel };