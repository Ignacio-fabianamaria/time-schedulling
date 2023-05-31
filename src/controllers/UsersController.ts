import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/UsersServices";
import { s3 } from "../config/aws";


class UsersController {
    private usersServices: UsersServices;
    constructor(){
        this.usersServices = new UsersServices();
    }
    index(){
        //buscar todos
    };

    show(){
        //buscar somente um
    };

    async store(request:Request, response:Response, next:NextFunction){
        //criar
        const {name, email, password} = request.body;
        try{
           const result = await this.usersServices.create({name, email, password});
           return response.status(201).json(result)

        } catch(error){
            next(error)
        }

    };

    auth(){
        //autenticação
    }

    async update(request:Request, response:Response, next:NextFunction){
        const {name,oldPassword, newPassword} = request.body;
        console.log(request.file);
        
        try{
            
            const result = await this.usersServices.update({
                name,
                oldPassword,
                newPassword,
                avatar_url:request.file});
                return response.status(200).json(result);
            

        } catch(error){
            next(error)
        }

    }
}

export{UsersController}