'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userSchema = (sequelize, DataTypes) => {
    const model = sequelize.define('User', {
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), allowNull: true, defaultValue: "user" },
        password: { type: DataTypes.STRING, allowNull: false },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ username: this.username }, process.env.SECRET, { expiresIn: 60 * 15 });
                //changed JWT to only be valid for 15 min
            }
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    user: ['read'],
                    writer: ['read', 'create'],
                    editor: ['read', 'create', 'update'],
                    admin: ['read', 'create', 'update', 'delete']
                };

                // return acl[this.role];
            }
        }
    });

    model.beforeCreate(async (user) => {
        let hashedPass = await bcrypt.hash(user.password, 10);
        user.password = hashedPass;
    });

    // Basic AUTH: Validating strings (username, password) 
    model.authenticateBasic = async function (username, password) {
        console.log("test")
        const user = await this.findOne({ where: { username } })
        const valid = await bcrypt.compare(password, user.password)
        if (valid) { return user; }
        throw new Error('Invalid User');
    }

    // Bearer AUTH: Validating a token
    model.authenticateToken = async function (token) {
        try {
            const parsedToken = jwt.verify(token, process.env.SECRET);
            const user = this.findOne({ where: { username: parsedToken.username } })
            if (user) {
                return user;
            }
            throw new Error("User Not Found");
        } catch (e) {
            throw new Error(e.message)
        }
    }

    return model;
}

module.exports = userSchema;
