import { Injectable } from '@nestjs/common';
import { ExchangesRepository } from './exchanges.repository';
import { Exchanges, MarketRatesParams } from './exchanges.types';
import { CreateExchangesDTO } from './dto/create-exchanges.dto';

@Injectable()
export class ExchangesService {
    constructor(
        private readonly exchangesRepository: ExchangesRepository
    ) { }

    async saveExchange(exchangesInfo: CreateExchangesDTO[]): Promise<void> {
        if (exchangesInfo.length) {
            for (const exchange of exchangesInfo) {
                await this.exchangesRepository.save(exchange)
            }
        }
        await this.exchangesRepository.save(exchangesInfo[0])
    }

    async getMarketRatesByEntityBank(entityBank: string): Promise<Exchanges[]> {
        return await this.exchangesRepository.findByEntityBank(entityBank)
    }

    async getAllExchangeQuotes(): Promise<Exchanges[]> {
        return await this.exchangesRepository.findAll()
    }

    async obtainMarketRatesByParams({ entityBank, date }: MarketRatesParams) {
        return await this.exchangesRepository.findByParams({ entityBank, date })
    }
}
