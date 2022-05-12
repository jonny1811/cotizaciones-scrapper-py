import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Service } from '../interfaces';
import { ExchangesDocument } from '../exchanges/exchanges.types';

@Injectable()
export class BancoContinentalService implements Service {
    async getExchangeData() {
        const URL = `https://www.bancontinental.com.py/`
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        })

        const results = await page.evaluate(() => {
            const parseBancoContinental = [
                {
                    moneda: "Dolar",
                    clase: '#slide-ngb-slide-6 > div > div'
                },
                {
                    moneda: "Peso Argentino",
                    clase: '#slide-ngb-slide-14 > div > div'
                },
                {
                    moneda: "Real",
                    clase: '#slide-ngb-slide-20 > div > div'
                },
                {
                    moneda: "Euro",
                    clase: '#slide-ngb-slide-8 > div > div'
                }
            ]
            let response: ExchangesDocument[] = []
            
            parseBancoContinental.map((dataMoney) => {
                const compra = document.querySelectorAll(dataMoney.clase)[0].children[1].children[1].textContent.trim()
                const venta = document.querySelectorAll(dataMoney.clase)[0].children[2].children[1].textContent.trim()
                
                response.push({
                    entityBank: 'Banco Continental',
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
