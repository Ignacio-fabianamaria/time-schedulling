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
}
export { SchedulesRepository }