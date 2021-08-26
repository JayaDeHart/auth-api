const express = require("express")
const v2Routes = express.Router();
const authBearer = require("../middleware/authBearer")
const ACL = require("../middleware/ACL")

const { food } = require("../models/index");

const HttpError = require("../error-handlers/http-error");

v2Routes.get("/foods", authBearer, getAllFoods)

v2Routes.get("/foods/:id", authBearer, getFoodById)

v2Routes.post("/foods", authBearer, ACL("create"), createFood)

v2Routes.put("/foods/:id", authBearer, ACL("update"), updateFood)

v2Routes.delete("/foods/:id", authBearer, ACL("delete"), deleteFood)

async function getAllFoods(req, res, next) {
    try {
        const all = food.getAll();
        res.status(200).json(all);
    } catch (err) {
        return next(new HttpError("Could not get all", 404))
    }
}


async function getFoodById(req, res) {
    try {
        const id = req.params.id;
        let food = await food.getOne(id)
        res.status(200).json(food);
    } catch (err) {
        return next(new HttpError("Could not get that food", 404))
    }

}

async function createFood(req, res) {
    try {
        let obj = req.body;
        let newRecord = await food.create(obj);
        res.status(201).json(newRecord);
    } catch (err) { return next(new HttpError("Could not create that food", 401)) }

}

async function updateFood(req, res) {
    try {
        const id = req.params.id;
        const obj = req.body;
        let updatedRecord = await food.update(id, obj)
        res.status(202).json(updatedRecord);
    } catch (err) { return next(new HttpError("Could not update that food", 401)) }

}

async function deleteFood(req, res) {
    try {
        let id = req.params.id;
        let deletedRecord = await food.destroy(id);
        res.status(202).json(deletedRecord);
    } catch (err) { return next(new HttpError("Could not delete that food", 401)) }

}

module.exports = v2Routes;