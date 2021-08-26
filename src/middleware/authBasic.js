//Decode Basic auth header
//Route user to handler or send error

const base64 = require("base-64")
const { users } = require("../models/index")
const HttpError = require("../error-handlers/http-error")


async function authBasic(req, res, next) {
    if (!req.headers.authorization) {
        return next(new HttpError("Not authorized", 403))
    }

    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');


    try {
        req.user = await users.authenticateBasic(user, pass)
        next();
    } catch (e) {
        return next(new HttpError("Not authorized", 403))
    }
}

module.exports = authBasic;