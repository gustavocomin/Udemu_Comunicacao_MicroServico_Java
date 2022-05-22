import Sequelize from "sequelize";
import sequelize from "../../../config/db/dbConfig.js";

const User = sequelize.define(
    "user",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    },
    {}
);

export default User;
