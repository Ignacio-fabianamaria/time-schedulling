import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../database/prisma"
import { ISchedulesCreate } from "../interfaces/SchedulesInterface";

class SchedulesRepository {
    async create({ name, phone, date }: ISchedulesCreate) {
        const result = await prisma.schedule.create({
            data: { name, phone, date }
        });
        return result;
    }

    async find(date: Date) {
        const result = await prisma.schedule.findFirst({
            where: { date }
        });
        return result;
    }

    async findAll(date: Date){
        const result = await prisma.schedule.findMany({
            where: {
                date: {
                    gte: startOfDay(date),
                    lt: endOfDay(date),
                },
            },
            orderBy: {
                date: 'asc',
            },
        });
        return result;
    }
    async update(id:string, date:Date){
        const result = await prisma.schedule.update({
            where: {
                id:id,
            },
            data: {
                date: date,
            },
        });
        return result;
    }
}
export { SchedulesRepository }