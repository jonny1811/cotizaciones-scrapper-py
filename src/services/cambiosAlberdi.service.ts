import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Service } from '../interfaces';
import { ExchangesDocument } from '../exchanges/exchanges.types';

@Injectable()
export class CambiosAlberdiService implements Service {
    async getExchangeData() {
        const URL = `http://www.cambiosalberdi.com/`
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        })

        const results = await page.evaluate(() => {
            const parseCambiosAlberdi = [
                {
                    moneda: "Dolar",
                    clase: 'li:nth-child(1) > div > div > div.listings_details'
                },
                {
                    moneda: "Peso Argentino",
                    clase: 'li:nth-child(4) > div > div > div.listings_details'
                },
                {
                    moneda: "Real",
                    clase: 'li:nth-child(2) > div > div > div.listings_details'
                },
                {
                    moneda: "Euro",
                    clase: 'li:nth-child(3) > div > div > div.listings_details'
                }
            ]
            let response: ExchangesDocument[] = []
            
            parseCambiosAlberdi.map((dataMoney) => {
                const compra = document.querySelectorAll(dataMoney.clase)[0].children[0].children[0].textContent.split(' ')[0].trim().replace('.', '')
                const venta = document.querySelectorAll(dataMoney.clase)[0].children[0].children[0].textContent.split(' ')[1].trim().replace('.', '')
                
                response.push({
                    entityBank: 'Cambios Alberdi',
                    name: dataMoney.moneda,
                    buyPrice: parseInt(compra),
                    sellPrice: parseInt(venta),
                    spread: parseInt(venta) - parseInt(compra),
                    date: new Date().toISOString()
                } as ExchangesDocument)
            })


            return response
        })

        await browser.close()
        return results
    }
}
