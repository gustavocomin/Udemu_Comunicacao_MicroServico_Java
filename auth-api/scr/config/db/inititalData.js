import bcrypt from "bcrypt";
import User from "../../modules/user/model/User.js";

export async function createInitalData() {
    try {
        await User.sync({ force: true });

        let password = await bcrypt.hash("123456", 10);

        await User.create({
            name: "user teste",
            email: "teste@teste.com",
            password: password,
        });
    } catch (err) {
        console.log("An error has occured!");
        console.log(err);
    }
}
