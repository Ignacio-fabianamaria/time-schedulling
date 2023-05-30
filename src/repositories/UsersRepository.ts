import { prisma } from "../database/prisma"
import { ICreate } from "../interfaces/UsersInterface";


class UsersRepository{
    async create({name, email, password}: ICreate){
        const result = await prisma.users.create({
            data:{
                name,
                email,
                password,

            },
        });
        return result;
    }
}
export{UsersRepository}