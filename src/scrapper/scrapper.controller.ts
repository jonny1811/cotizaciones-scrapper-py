import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {

    constructor(
        private scrapperService: ScrapperService
    ) { }

    @Get('familiar')
    async scrapperBankFamiliar() {
        return await this.scrapperService.getFamiliarExchange()
    }

    @Get('cambios-chaco')
    async scrapperCambiosChaco() {
        return await this.scrapperService.getCambiosChacoExchange()
    }
}
