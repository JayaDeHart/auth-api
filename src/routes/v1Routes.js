const express = require("express")
const v1Routes = express.Router();

const { food } = require("../models/index");

const HttpError = require("../error-handlers/http-error");

v1Routes.get("/foods", getAllFoods)

v1Routes.get("/foods/:id", getFoodById)

v1Routes.post("/foods", createFood)

v1Routes.put("/foods/:id", updateFood)

v1Routes.delete("/foods/:id", deleteFood)

async function getAllFoods(req, res, next) {
    try {
        const all = await food.getAll();
        console.log(all)
        res.status(200).json(all);
    } catch (err) {
        return next(new HttpError("Could not get all", 404))
    }
}


async function getFoodById(req, res, next) {
    try {
        const id = req.params.id;
        let food = await food.getOne(id)
        res.status(200).json(food);
    } catch (err) {
        return next(new HttpError("Could not get that food", 404))
    }

}

async function createFood(req, res, next) {
    try {
        let obj = req.body;
        let newRecord = await food.create(obj);
        res.status(201).json(newRecord);
    } catch (err) { return next(new HttpError("Could not create that food", 401)) }

}

async function updateFood(req, res, next) {
    try {
        const id = req.params.id;
        const obj = req.body;
        let updatedRecord = await food.update(id, obj)
        res.status(202).json(updatedRecord);
    } catch (err) { return next(new HttpError("Could not update that food", 401)) }

}

async function deleteFood(req, res, next) {
    try {
        let id = req.params.id;
        let deletedRecord = await food.destroy(id);
        res.status(202).json(deletedRecord);
    } catch (err) { return next(new HttpError("Could not delete that food", 401)) }

}

module.exports = v1Routes;