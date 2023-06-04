import { hash, compare } from "bcrypt";
import { ICreate, IUpdate } from "../interfaces/UsersInterface";
import { UsersRepository } from "../repositories/UsersRepository";
import { s3 } from "../config/aws";
import { v4 as uuid } from 'uuid';
import { sign, verify } from "jsonwebtoken";

class UsersServices {
    private usersRepository: UsersRepository;
    constructor() {
        this.usersRepository = new UsersRepository();
    }
    async create({ name, email, password }: ICreate) {
        const findUser = await this.usersRepository.findUserByEmail(email);
        if (findUser) {
            throw new Error('User exist')
        }
        const hashPassword = await hash(password, 10)
        const create = await this.usersRepository.create({ name, email, password: hashPassword });
        return create;
    }

    async auth(email: string, password: string) {
        const findUser = await this.usersRepository.findUserByEmail(email);
        if (!findUser) {
            throw new Error('User or password invalid.')
        }
        const isPassword = compare(password, findUser.password);
        if (!isPassword) {
            throw new Error('User or password invalid.')
        }
        let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN;
        if (!secretKey) { throw new Error('There is no token key') }

        let secretKeyRefreshToken: string | undefined = process.env.ACCESS_KEY_TOKEN_REFRESH;
        if (!secretKeyRefreshToken) { throw new Error('There is no token key') }

        const token = sign({ email }, secretKey, {
            subject: findUser.id,
            expiresIn: 60 * 20,
        });
        const refreshToken = sign({ email }, secretKeyRefreshToken, {
            subject: findUser.id,
            expiresIn: '7d',
        });
        return {
            token,
            refresh_Token: refreshToken,
            user: { name: findUser.name, email: findUser.email },
        }
    }

    async refresh(refresh_Token: string) {
        if (!refresh_Token) { throw new Error('Refresh token missing')};

        let secretKeyRefresh: string | undefined = process.env.ACCESS_KEY_TOKEN_REFRESH;
        if (!secretKeyRefresh) { throw new Error('There is no token key') };

        let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN_REFRESH;
        if (!secretKey) { throw new Error('There is no token key') };

        const verifyToken = verify(refresh_Token, secretKeyRefresh);
        const {sub} = verifyToken;
        const newToken = sign({sub}, secretKey, {expiresIn: '1h'});
        const refreshToken = sign({sub}, secretKeyRefresh, {expiresIn: '7d'})

        return { token: newToken, refresh_Token:refreshToken};
    }



    async update({ name, oldPassword, newPassword, avatar_url, user_id }: IUpdate) {
        let password
        if (oldPassword && newPassword) {
            const finfUserById = await this.usersRepository.findUserById(user_id);

            if (!finfUserById) {
                throw new Error('User not found');
            };

            const isPassword = compare(oldPassword, finfUserById.password);

            if (!isPassword) {
                throw new Error('Password invalid.');
            };
            password = await hash(newPassword, 10)
            await this.usersRepository.updatePassword(password, user_id)
        }
        if (avatar_url) {

            const uploadImage = avatar_url?.buffer;
            const uploadS3 = await s3.upload({
                Bucket: 'desafio-react-node-herocode',
                Key: `${uuid()}-${avatar_url?.originalname}`,
                // ACL: 'public-read',
                Body: uploadImage,
            }).promise();
            console.log('url =>', uploadS3.Location);
            await this.usersRepository.update(name, user_id, uploadS3.Location);
        }
        return { message: "User updated successfully" };
    }
}
export { UsersServices }