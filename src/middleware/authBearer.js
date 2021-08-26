//Decode bearer header
//route user

const { users } = require('../models');
const HttpError = require("../error-handlers/http-error")

module.exports = async (req, res, next) => {

    try {

        if (!req.headers.authorization) { _authError() }

        const token = req.headers.authorization.split(' ').pop();
        const validUser = await users.model.authenticateToken(token);

        req.user = validUser;
        req.token = validUser.token;
        next();

    } catch (e) {
        return next(new HttpError("Invalid Token", 403))
    }
}
