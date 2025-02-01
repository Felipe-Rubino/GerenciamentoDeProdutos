import { Injectable } from "@nestjs/common";
import { format } from 'date-fns';

@Injectable()
export class StatusService {

    async serverStatus() {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
        return formattedDate;
    }
}