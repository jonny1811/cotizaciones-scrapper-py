import { Controller, Get } from '@nestjs/common';
import { BancoFamiliarService, CambiosChacoService } from '../services';
import { ExchangesService } from '../exchanges/exchanges.service';
import { SCRAPPERS_BASE_PATH } from './scrappers.constants';
import { BancoVisionService } from '../services/bancoVision.service';
import { Cron } from '@nestjs/schedule';

@Controller(SCRAPPERS_BASE_PATH)
export class ScrapperController {

    constructor(
        private readonly bancoFamiliarService: BancoFamiliarService,
        private readonly cambiosChacoService: CambiosChacoService,
        private readonly bancoVisionService: BancoVisionService,
        private readonly exchangesService: ExchangesService
    ) {}

    @Get('banco-familiar')
    async scrapperBankFamiliar() {
        const bankFamiliar = await this.bancoFamiliarService.getExchangeData()
        await this.exchangesService.saveExchange(bankFamiliar)
        return {
            entityBank: 'Banco Familiar',
            status: 200
        }
    }

    @Get('cambios-chaco')
    async scrapperCambiosChaco() {
        const cambiosChaco = await this.cambiosChacoService.getExchangeData()
        await this.exchangesService.saveExchange(cambiosChaco)
        return {
            entityBank: 'Cambios Chaco',
            status: 200
        }
    }

    @Get('banco-vision')
    async scrapperBankVision() {
        const bankVision = await this.bancoVisionService.getExchangeData()
        await this.exchangesService.saveExchange(bankVision)
        return {
            entityBank: 'Vision Banco',
            status: 200
        }
    }
    
    @Get('all')
    @Cron('20 * * * *')
    async scrapperAllBankAndExchanges() {
        const [bankFamiliar, exchangeChaco, bankVision] = await Promise.all([
            this.bancoVisionService.getExchangeData(),
            this.cambiosChacoService.getExchangeData(),
            this.bancoVisionService.getExchangeData(),

        ])
        
        await Promise.all([
            this.exchangesService.saveExchange(bankFamiliar),
            this.exchangesService.saveExchange(exchangeChaco),
            this.exchangesService.saveExchange(bankVision)
        ])

        return {
            entityBank: 'All',
            status: 200
        }
    }
}
