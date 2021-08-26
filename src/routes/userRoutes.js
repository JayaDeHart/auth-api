const express = require("express");
const usersRouter = express.Router();

const { users } = require("../models/index");
const authBasic = require("../middleware/authBasic")
const HttpError = require("../error-handlers/http-error")


usersRouter.post("/signup", signupHandler);

usersRouter.post("/signin", authBasic, signinHandler);

async function signupHandler(req, res, next) {
    try {
        const user = await users.create(req.body);
        const response = {
            user: {
                id: user.id,
                username: user.username,
            },
            token: user.token
        }
        res.status(201).json(response)
    } catch (err) {
        console.log(err)
    }
}


async function signinHandler(req, res, next) {
    const user = {
        user: req.user,
        token: req.user.token
    };
    res.status(200).json(user);
}

module.exports = usersRouter