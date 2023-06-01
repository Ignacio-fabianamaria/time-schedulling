import { ISchedulesCreate } from "../interfaces/SchedulesInterface";
import { startOfHour, isBefore, getHours } from 'date-fns'
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class SchedulesService {
    private schedulesRepository: SchedulesRepository;
    constructor() {
        this.schedulesRepository = new SchedulesRepository();
    }
    async create({ name, phone, date, user_id }: ISchedulesCreate) {
        if (date === undefined) {
            throw new Error("Data não fornecida");
        }

        const dateFormatted = new Date(date);
        const hourStart = startOfHour(dateFormatted);
        const hour = getHours(hourStart);

        if(hour<= 9 || hour >= 19){
            throw new Error('Create Schedules between 9 and 19.')
        }

        if (isBefore(hourStart, new Date())) {
            throw new Error('It is not allowed to schedules old date');
        };

        const chechIsavailable = await this.schedulesRepository.find(hourStart, user_id)
        if (chechIsavailable) {
            throw new Error('Schedules date is not available')
        }
        const create = await this.schedulesRepository.create({ name, phone, date: hourStart, user_id });
        return create;
    }

    async index(date: Date) {
        const result = await this.schedulesRepository.findAll(date);
        console.log('listar todos => ', result);
        return result;
    }

    async update(id:string, date:Date, user_id:string) {
        const dateFormatted = new Date(date);
        const hourStart = startOfHour(dateFormatted)

        if (isBefore(hourStart, new Date())) {
            throw new Error('It is not allowed to schedules old date');
        };

        const chechIsavailable = await this.schedulesRepository.find(hourStart, user_id)

        if (chechIsavailable) {
            throw new Error('Schedules date is not available')
        }

        const result = await this.schedulesRepository.update(id, date);
        return result;
    }

}

export { SchedulesService };