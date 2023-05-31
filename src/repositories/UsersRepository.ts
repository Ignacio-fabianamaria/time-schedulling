import { prisma } from "../database/prisma"
import { ICreate } from "../interfaces/UsersInterface";


class UsersRepository {
    async create({ name, email, password }: ICreate) {
        const result = await prisma.users.create({
            data: {
                name,
                email,
                password,

            },
        });
        return result;
    }
    async findUserByEmail(email: string) {
        const result = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        return result;
    }

    async update(name: string, newpassword: string, avatar_url: string) {
        const result = await prisma.users.update({
            where: {
                // filter here
            },
            data: {
                name,
                password: newpassword,
                avatar_url,
            },
        });
        return result
    }
}
export { UsersRepository }