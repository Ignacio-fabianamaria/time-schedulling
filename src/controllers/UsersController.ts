import { NextFunction, Request, Response } from "express";

class UsersController {
    index(){
        //buscar todos
    };

    show(){
        //buscar somente um
    };

    store(request:Request, response:Response, next:NextFunction){
        //criar
        const {name, email, password} = request.body;
        try{
           const result = userService(name, email, password);
           return response.status(201).json(result)

        } catch(error){
            next(error)
        }

    };

    auth(){
        //autenticação
    }
}

export{UsersController}