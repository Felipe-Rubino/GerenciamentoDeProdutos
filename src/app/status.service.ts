import { Injectable } from "@nestjs/common";
import { format } from 'date-fns';
import { DataSource } from "typeorm";

@Injectable()
export class StatusService {

    constructor(private dataSource: DataSource) {}

    async testDatabaseConnection(): Promise<boolean> {
        try {
            await this.dataSource.query('SELECT 1');
            return true;
        } catch (error) {
            console.error('Falha ao conectar ao banco de dados:', error);
            return false;
        }
    }

    async checkServerStatus(): Promise<string> {
        try {
            return 'OK';
        } catch (error) {
            return 'FALHA';
        }
    }

    async serverStatus() {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'dd-MM-yyyy HH:mm:ss');
        const databaseStatus = await this.testDatabaseConnection() ? 'OK' : 'Falha';
        const serverStatus = await this.checkServerStatus();
        return {
            dateTime: formattedDate,
            serverStatus,
            databaseStatus: databaseStatus,
        };
    }
}