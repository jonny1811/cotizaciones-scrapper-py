import { Injectable } from '@nestjs/common';
import { ExchangesRepository } from '../repositories/exchanges.repository';
import { ExchangeData } from '../interfaces/exchanges';

@Injectable()
export class ExchangesService {
    constructor(
        private readonly exchangesRepository: ExchangesRepository
    ) { }

    async saveExchange(data: ExchangeData[]): Promise<void> {
        if (data.length) {
            for (const excData of data) {
                await this.exchangesRepository.save(excData)
            }
        }
        await this.exchangesRepository.save(data[0])
    }

    async getAllExchangeQuotes(): Promise<ExchangeData[]> {
        return await this.exchangesRepository.findAll()
    }
}
