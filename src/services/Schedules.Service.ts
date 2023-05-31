import { ISchedulesCreate } from "../interfaces/SchedulesInterface";
import { startOfHour, isBefore} from 'date-fns'
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class SchedulesService{
    private schedulesRepository: SchedulesRepository;
    constructor(){
        this.schedulesRepository = new SchedulesRepository();
    }
    async create({name, phone, date}: ISchedulesCreate){
        if (date === undefined) {
            // Tratar caso date seja undefined
            throw new Error("Data não fornecida");
        }
        const dateFormatted = new Date(date);
        const hourStart = startOfHour(dateFormatted)

        console.log('schedules formatado =>',   hourStart);
        
        if(isBefore(hourStart, new Date())){
            throw new Error('It is not allowed to schedules old date');
        };

        const chechIsavailable = await this.schedulesRepository.find(hourStart)
        if(chechIsavailable){
            throw new Error('Schedules date is not available')
        }
        const create = await this.schedulesRepository.create({name, phone, date:hourStart});
        return create;
    }
    
}

export{SchedulesService};