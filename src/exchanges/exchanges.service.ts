import { Injectable } from '@nestjs/common';
import { ExchangesRepository } from './exchanges.repository';
import { Exchanges, MarketRatesParams } from './exchanges.types';
import { CreateExchangesDTO } from './dto/create-exchanges.dto';
import { MarketRatesQueryDTO } from './dto/market-rates.query.dto';
import { PlaceRepository } from '../place/place.repository';

@Injectable()
export class ExchangesService {
    constructor(
        private readonly exchangesRepository: ExchangesRepository
    ) { }

    async saveExchange(exchangesInfo: CreateExchangesDTO): Promise<void> {
        await this.exchangesRepository.save(exchangesInfo)
    }

    async getMarketRatesByEntityBank(entityBank: string): Promise<Exchanges[]> {
        return await this.exchangesRepository.findByEntityBank(entityBank)
    }

    async getAllExchangeQuotes(): Promise<Exchanges[]> {
        return await this.exchangesRepository.findAll()
    }

    async getMarketRatesByParams({ entityBank, date }: MarketRatesParams) {
        return await this.exchangesRepository.findByParams({ entityBank, date })
    }

    async getAllMarketsRates(marketRatesQueryDTO: MarketRatesQueryDTO) {
        const { page, pageSize } = marketRatesQueryDTO
        return await this.exchangesRepository.findPaginated(page, pageSize)
    }
}
