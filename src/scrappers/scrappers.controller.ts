import { Controller, Get } from '@nestjs/common';
import { BancoFamiliarService, CambiosChacoService } from '../services';

@Controller('scrapper')
export class ScrapperController {

    constructor(
        private bancoFamiliarService: BancoFamiliarService,
        private cambiosChacoService: CambiosChacoService,
    ) { }

    @Get('familiar')
    async scrapperBankFamiliar() {
        return await this.bancoFamiliarService.getExchangeData()
    }

    @Get('cambios-chaco')
    async scrapperCambiosChaco() {
        return await this.cambiosChacoService.getExchangeData()
    }
}
