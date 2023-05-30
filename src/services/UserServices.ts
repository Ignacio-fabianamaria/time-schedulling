import { ICreate } from "../interfaces/UsersInterface";
import { UsersRepository } from "../repositories/UsersRepository";

class UserServices {
    private usersRepository: UsersRepository;
    constructor(){
        this.usersRepository = new UsersRepository();
    }
    async create({ name, email, password }: ICreate){
        const findUser = await this.usersRepository.findUserByEmail(email);
        if(findUser){
            throw new Error('User exist')
        }
        const create = this.usersRepository.create({ name, email, password })
    }
}
export {UserServices}