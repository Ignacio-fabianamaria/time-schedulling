import { ICreate } from "../interfaces/UsersInterface";
import { UsersRepository } from "../repositories/UsersRepository";

class UserServices {
    private usersRepository: UsersRepository;
    constructor(){
        this.usersRepository = new UsersRepository();
    }
    create({ name, email, password }: ICreate){
        const findUser = this.usersRepository.create({ name, email, password })
    }
}
export {UserServices}