import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Service } from '../interfaces';
import { ExchangesDocument } from '../exchanges/exchanges.types';

@Injectable()
export class BancoVisionService implements Service {
    async getExchangeData() {
        const URL = `https://www.visionbanco.com/`
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        })

        const results = await page.evaluate(() => {
            const parseBancoVision = [
                {
                    moneda: "Dolar",
                    clase: '#efectivo > table > tbody > tr:nth-child(1)'
                },
                {
                    moneda: "Peso Argentino",
                    clase: '#efectivo > table > tbody > tr:nth-child(3)'
                },
                {
                    moneda: "Real",
                    clase: '#efectivo > table > tbody > tr:nth-child(2)'
                },
                {
                    moneda: "Euro",
                    clase: '#efectivo > table > tbody > tr:nth-child(4)'
                }
            ]
            let response: ExchangesDocument[] = []
            
            parseBancoVision.map((dataMoney) => {
                const compra = document.querySelectorAll(dataMoney.clase)[0].children[1].children[0].textContent.trim().replace('.', '')
                const venta = document.querySelectorAll(dataMoney.clase)[0].children[2].children[0].textContent.trim().replace('.', '')
                
                response.push({
                    entityBank: 'Banco Vision',
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
