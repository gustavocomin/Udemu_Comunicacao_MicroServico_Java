import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as secrets from "../../../config/constants/sercrets.js";
import UserRepository from "../repository/UserRepository.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import UserException from "../exception/UserException.js";

class UserService {
    async findByEmail(req) {
        try {
            const { email } = req.params;
            this.validateRequestData(email);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            return {
                status: httpStatus.SUCCESS,
                user: {
                    Id: user.id,
                    Name: user.Nome,
                    Email: user.email,
                },
            };
        } catch (error) {
            return {
                status: error.status
                    ? error.status
                    : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    validateRequestData(email) {
        if (!email)
            throw new UserException(
                httpStatus.BAD_REQUEST,
                "User email was not informed."
            );
    }

    validateUserNotFound(user) {
        if (!user)
            throw new Error(httpStatus.BAD_REQUEST, "User was not found!");
    }

    async getAccesToken(req) {
        try {
            const { email, password } = req.body;
            this.validateAccesTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            await this.validatepassword(password, user.password);
            const authUser = {
                Id: user.id,
                Name: user.Nome,
                Email: user.email,
            };
            const accesToken = jwt.sign({ authUser }, secrets.API_SECRET, {
                expiresIn: "1d",
            });
            return{
                status: httpStatus.SUCCESS,
                accesToken,
            }
        } catch (error) {
            return {
                status: error.status
                    ? error.status
                    : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    validateAccesTokenData(email, password) {
        if (!email || !password)
            throw new UserException(
                httpStatus.UNAUTHORIZED,
                "Email and password must be informed."
            );
    }

    async validatepassword(password, hashPassword) {
        if (!(await bcrypt.compare(password, hashPassword)))
            throw new UserException(
                httpStatus.UNAUTHORIZED,
                "Password doesn't not match."
            );
    }
}

export default new UserService();
