import UserRepository from "../repository/UserRepository";
import * as httpStatus from "../../../config/constants/httpStatus";
import { use } from "bcrypt/promises";

class UserService {
    async findByEmail(req) {
        try {
            const { email } = req.params;
            this.validadarDadosRequisicao(email);
            let user = UserRepository.findByEmail(email);

            if (!user) {
            }

            return {
                status: httpStatus.SUCCESS,
                user: {
                    Id: user.id,
                    Nome: user.Nome,
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

    validadarDadosRequisicao(email) {
        if (!email) throw new Error("User email was not informed.");
    }
}

export default new UserService();
