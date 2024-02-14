const express = require('express');
const movieRouter = express.Router();
const { MovieModel } = require('../model/movie.model');
const { auth } = require('../middlewares/auth.middleware');

movieRouter.get("/", async (req, res) => {
    try {
        let data = await MovieModel.find()
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})

movieRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let data = await MovieModel.findOne({ _id: id })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})

movieRouter.post('/add', async (req, res) => {
    const { title, poster, duration, category, rating, date, description, languages } = req.body;
    try {
        const newMovie = new MovieModel({ title, poster, duration, category, rating, date, description, languages, bookings: [] })
        await newMovie.save();
        res.status(200).send({ "msg": "New Movie data is added" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong, Please try again" })
    }
})

movieRouter.patch("/update/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        await MovieModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({ "msg": "Movie data is Updated" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})

movieRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await MovieModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ "msg": "Movie data is deleted" })
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong" })
    }
})

module.exports = { movieRouter };