import { NextFunction, Request, Response } from "express";
import { SchedulesService } from "../services/Schedules.Service";
import { parseISO } from "date-fns";

class SchedulesControlle{;
    private schedulesService:SchedulesService
    constructor(){
        this.schedulesService = new SchedulesService();
    }
    //metodo para criar
    async store(request:Request, response:Response, next:NextFunction){
        const{name, phone, date} = request.body;
        try {
            const result = await this.schedulesService.create({name, phone, date});

            return response.status(201).json(result)
        } catch (error) {
            next(error)
        };
    };
    //metodo para listar
    async index(request:Request, response:Response, next:NextFunction){
        const { date } = request.query;
        const parseDate = date? parseISO(date.toString()) : new Date();
        try {
            const result = await this.schedulesService.index(parseDate)
            return response.status(200).json(result)
        } catch (error) {
            next(error)
        }
    };

    //metodo para atualizar
    update(request:Request, response:Response, next:NextFunction){};

    //metodo para deletar
    delete(request:Request, response:Response, next:NextFunction){};

}
export{SchedulesControlle}