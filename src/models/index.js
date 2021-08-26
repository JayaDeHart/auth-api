const POSTGRES_URI =
    process.env.NODE_ENV === "test" ? "sqlite:memory" : process.env.DATABASE_URL;
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }
        : {};

const { Sequelize, DataTypes } = require("sequelize");
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const CollectionClass = require("./collection-class");
const foodSchema = require("./food");
const userSchema = require("./users");

const users = userSchema(sequelize, DataTypes);
const food = foodSchema(sequelize, DataTypes);
const foodClass = new CollectionClass(food)



module.exports = {
    db: sequelize,
    users: users,
    food: foodClass
};