const Food = (sequelize, DataTypes) =>
    sequelize.define("Food", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

module.exports = Food;