import { prisma } from "../database/prisma"

interface ICreate {
    name: string;
    email: string;
    password: string;

}

class UserRepository{
    async createStoreHook({name, email, password}: ICreate){
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
export{UserRepository}