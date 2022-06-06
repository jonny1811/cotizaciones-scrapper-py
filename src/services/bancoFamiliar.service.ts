import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Service } from '../interfaces/services';
import { Details } from '../exchanges/exchanges.types';
import { HttpService } from '@nestjs/axios';
import { PlaceService } from '../place/place.service';
import { PlaceBranch, PlaceType } from '../place/place.types';
import { CreateExchangesDTO } from '../exchanges/dto/create-exchanges.dto';
import { DateUtils } from '../utils';

const BANK_NAME = 'FAMILIAR_BANCO';
const PLACE_URL = 'https://ssecure.familiar.com.py/familiar-api/datos-generales-familiar/lugares';

@Injectable()
export class BancoFamiliarService implements Service {
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
                phoneNumber: null,
                email: 'atencion@familiar.com.py',
                imageUrl: null,
                name: place.nombre,
                schedule: 'Lunes a Viernes de 8 a 17 hs. Sabado de 8 a 12 hs.',
                remoteCode: `${place.direccion}`,
            });
        }

        let placeInfo = {
            code: BANK_NAME,
            name: 'Banco Familiar',
            type: PlaceType.BANK,
            branches: branch,
        };

        return placeInfo;
    }

    async getExchangeData(): Promise<CreateExchangesDTO> {
        const URL = `https://www.familiar.com.py/`
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
		let exchangeData: CreateExchangesDTO = null;
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        })

        const details = await page.evaluate(() => {
            const parseFamiliar = [
                {
                    moneda: "USD",
                    clase: '#cotizaciones > div > div.row > div:nth-child(1)'
                },
                {
                    moneda: "ARS",
                    clase: '#cotizaciones > div > div.row > div:nth-child(3)'
                },
                {
                    moneda: "BRL",
                    clase: '#cotizaciones > div > div.row > div:nth-child(4)'
                },
                {
                    moneda: "EUR",
                    clase: '#cotizaciones > div > div.row > div:nth-child(5)'
                }
            ]
            let details: Partial<Details>[] = [];

            parseFamiliar.map((dataMoney) => {
                const purchase = document.querySelectorAll(dataMoney.clase)[0].children[1].children[0].textContent.trim().replace('C:', '').replace('.', '')
                const sale = document.querySelectorAll(dataMoney.clase)[0].children[1].children[1].textContent.trim().replace('V:', '').replace('.', '')

                details.push({
                    purchasePrice: parseInt(purchase),
                    salePrice: parseInt(sale),
                    isoCode: dataMoney.moneda,
                })
            })

            return details;
        });

		exchangeData = await this.createExchangeDTO(details);

        await browser.close()
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
