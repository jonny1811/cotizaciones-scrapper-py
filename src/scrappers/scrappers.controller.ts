import { Controller, Get } from '@nestjs/common';
import { BancoFamiliarService, CambiosChacoService } from '../services';
import { ExchangesService } from '../exchanges/exchanges.service';
import { SCRAPPERS_BASE_PATH } from './scrappers.constants';
import { BancoVisionService } from '../services/bancoVision.service';
import { Cron } from '@nestjs/schedule';
import { CambiosAlberdiService } from '../services/cambiosAlberdi.service';
import { BancoContinentalService } from '../services/bancoContinental.service';
import { PlaceService } from '../place/place.service';

@Controller(SCRAPPERS_BASE_PATH)
export class ScrapperController {

    constructor(
        private readonly cambiosChacoService: CambiosChacoService,
        private readonly cambiosAlberdiService: CambiosAlberdiService,
        private readonly bancoFamiliarService: BancoFamiliarService,
        private readonly bancoVisionService: BancoVisionService,
        private readonly bancoContinentalService: BancoContinentalService,
        private readonly exchangesService: ExchangesService,
		private readonly placeService: PlaceService
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

    @Get('banco-vision')
    async scrapperBankVision() {
        // const placeInfo = await this.bancoVisionService.getExchangePlace()
		// await this.placeService.savePlace(placeInfo)
		const bankVision = await this.bancoVisionService.getExchangeData()
        await this.exchangesService.saveExchange(bankVision)
        return {
            status: 200,
            message: 'Correctly Data Saved at Banco Vision',
			data: bankVision
        }
    }

    @Get('banco-continental')
    async scrapperBancoContinental() {
        const bankContinental = await this.bancoContinentalService.getExchangeData()
        await this.exchangesService.saveExchange(bankContinental)
        return {
            entityBank: 'Banco Continental',
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

    @Get('cambios-alberdi')
    async scrapperCambiosAlberdi() {
        const cambiosAlberdi = await this.cambiosAlberdiService.getExchangeData()
        await this.exchangesService.saveExchange(cambiosAlberdi)
        return {
            entityBank: 'Cambios Alberdi',
            status: 200
        }
    }
    
    @Get('all')
    @Cron('20 * * * *')
    async scrapperAllBankAndExchanges() {
        const [
            bankFamiliar,
            bankVision,
            bankContinental,
            exchangeChaco,
            exchangeAlberdi
        ] = await Promise.all([
            this.bancoFamiliarService.getExchangeData(),
            this.bancoVisionService.getExchangeData(),
            this.bancoContinentalService.getExchangeData(),
            this.cambiosChacoService.getExchangeData(),
            this.cambiosAlberdiService.getExchangeData()
        ])
        
        await Promise.all([
            this.exchangesService.saveExchange(bankFamiliar),
            this.exchangesService.saveExchange(bankVision),
            this.exchangesService.saveExchange(bankContinental),
            this.exchangesService.saveExchange(exchangeChaco),
            this.exchangesService.saveExchange(exchangeAlberdi)
        ])

        return {
            entityBank: 'All',
            status: 200
        }
    }
}
