import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Service } from '../interfaces';
import { Details } from '../exchanges/exchanges.types';
import { HttpService } from '@nestjs/axios';
import { PlaceService } from '../place/place.service';
import { PlaceBranch, PlaceType } from '../place/place.types';
import { CreateExchangesDTO } from '../exchanges/dto/create-exchanges.dto';
import { DateUtils } from 'src/utils';

const BANK_NAME = 'CONTINENTAL_BANCO'
const PLACE_URL = 'https://www.bancontinental.com.py/api/cajeros';

@Injectable()
export class BancoContinentalService implements Service {
    constructor(
        private readonly httpService: HttpService,
        private readonly placeService: PlaceService,
    ) {}

    async getExchangePlace() {
        const placeAPIData = await this.httpService.get(PLACE_URL).toPromise();
        let branch: PlaceBranch[] = [];

        for (const place of placeAPIData.data) {
            branch.push({
                latitude: place.latitud,
                longitude: place.longitud,
                phoneNumber: place.telefono,
                email: null,
                imageUrl: null,
                name: place.nombre,
                schedule: null,
                remoteCode: `${place.direccion}-${place.ciudad}`,
            });
        }
        let placeInfo = {
            code: BANK_NAME,
            name: 'Banco Continental',
            type: PlaceType.BANK,
            branches: branch,
        };
        return placeInfo;
    }

    async getExchangeData() {
        const URL = `https://www.bancontinental.com.py/`;
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        let exchangeData: CreateExchangesDTO = null;
        await page.goto(URL, {
            waitUntil: 'networkidle2',
        });

        const details = await page.evaluate(() => {
            const parseBancoContinental = [
                {
                    moneda: 'Dolar',
                    clase: '#slide-ngb-slide-6 > div > div',
                },
                {
                    moneda: 'Peso Argentino',
                    clase: '#slide-ngb-slide-14 > div > div',
                },
                {
                    moneda: 'Real',
                    clase: '#slide-ngb-slide-20 > div > div',
                },
                {
                    moneda: 'Euro',
                    clase: '#slide-ngb-slide-8 > div > div',
                },
            ];
            let details: Partial<Details>[] = [];

            parseBancoContinental.map((dataMoney) => {
                const purchase = document
                    .querySelectorAll(dataMoney.clase)[0]
                    .children[1].children[1].textContent.trim();
                const sale = document
                    .querySelectorAll(dataMoney.clase)[0]
                    .children[2].children[1].textContent.trim();

                details.push({
                    purchasePrice: parseInt(purchase),
                    salePrice: parseInt(sale),
                    isoCode: dataMoney.moneda,
                });
            });

            return details;
        });

		exchangeData = await this.createExchangeDTO(details)

        await browser.close();
        return exchangeData;
    }

	async createExchangeDTO(details: Partial<Details>[]): Promise<CreateExchangesDTO> {
        const place = await this.placeService.getPlaceByCode(BANK_NAME);
        const detailsData: CreateExchangesDTO = {
            date: DateUtils.splitDate(),
            place: place[0]._id,
            branch: '',
            fullDate: new Date().toISOString(),
            details: details,
        };

        return detailsData;
    }
}
