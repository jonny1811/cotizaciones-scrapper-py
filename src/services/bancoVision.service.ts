import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Service } from '../interfaces';
import { Details, ExchangesDocument, Exchanges } from '../exchanges/exchanges.types';
import { HttpService } from '@nestjs/axios';
import { PlaceType, PlaceBranch } from '../place/place.types';
import { PlaceService } from '../place/place.service';
import { DateUtils } from 'src/utils';
import { CreateExchangesDTO } from '../exchanges/dto/create-exchanges.dto';

const BANK_NAME = 'VISION_BANCO';
const PLACE_URL = 'https://www.visionbanco.com/sucursales/list_items';

@Injectable()
export class BancoVisionService implements Service {
    constructor(private httpService: HttpService, private placeService: PlaceService) {}

    async getExchangePlace() {
        const placeAPIData = await this.httpService.get(PLACE_URL).toPromise();
        let branch: PlaceBranch[] = [];
        
		for (const place of placeAPIData.data.items) {
            branch.push({
                latitude: place.gmap.latitude,
                longitude: place.gmap.longitude,
                phoneNumber: place.contact[0].number,
                email: null,
                imageUrl: null,
                name: place.title,
                schedule: place.hours,
                remoteCode: place.url_title,
            });
        }
        let placeInfo = {
            code: BANK_NAME,
            name: 'Banco Vision',
            type: PlaceType.BANK,
            branches: branch,
        };
        return placeInfo;
    }

    async getExchangeData() {
        const URL = `https://www.visionbanco.com/`;
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        let exchangeData: CreateExchangesDTO = null;
        await page.goto(URL, {
            waitUntil: 'networkidle2',
        });

        const details = await page.evaluate(() => {
            const parseBancoVision = [
                {
                    moneda: 'USD',
                    clase: '#efectivo > table > tbody > tr:nth-child(1)',
                },
                {
                    moneda: 'ARS',
                    clase: '#efectivo > table > tbody > tr:nth-child(3)',
                },
                {
                    moneda: 'BRL',
                    clase: '#efectivo > table > tbody > tr:nth-child(2)',
                },
                {
                    moneda: 'EUR',
                    clase: '#efectivo > table > tbody > tr:nth-child(4)',
                },
            ];
            let details: Partial<Details>[] = [];

            parseBancoVision.map((dataMoney) => {
                const purchase = document
                    .querySelectorAll(dataMoney.clase)[0]
                    .children[1].children[0].textContent.trim()
                    .replace('.', '');
                const sale = document
                    .querySelectorAll(dataMoney.clase)[0]
                    .children[2].children[0].textContent.trim()
                    .replace('.', '');

                details.push({
                    purchasePrice: parseInt(purchase),
                    salePrice: parseInt(sale),
                    isoCode: dataMoney.moneda,
                });
            });

            return details;
        });

        exchangeData = await this.createExchangeDTO(details);

        await browser.close();
        return exchangeData;
    }

    async createExchangeDTO(details: Partial<Details>[]): Promise<CreateExchangesDTO> {
        const place = await this.placeService.getPlaceByCode(BANK_NAME);
        const detailsData: CreateExchangesDTO = {
            date: DateUtils.splitDate(),
            place: place[0]._id,
            branch: null,
            fullDate: new Date().toISOString(),
            details: details,
        };

        return detailsData;
    }
}
