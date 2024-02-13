const { ListModel } = require("../model/list.model");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const tkn = await ListModel.find({ token });
        if (!tkn) {
            jwt.verify(token, "users", (err, decoded) => {
                if (err) {
                    res.status(202).send(err);
                }
                else {
                    req.body.username = decoded.username;
                    req.body.userId = decoded.userId;
                    next();
                }
            })
        } else {
            res.status(203).send({ "msg": "Please Login" })
        }
    } else {
        res.status(400).send({ "msg": "please login" })
    }
}
module.exports = { auth };