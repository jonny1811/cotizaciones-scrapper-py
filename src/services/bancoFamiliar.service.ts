import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Service } from '../interfaces/services';
import { ExchangesDocument } from '../exchanges/exchanges.types';

@Injectable()
export class BancoFamiliarService implements Service {
    async getExchangeData() {
        const URL = `https://www.familiar.com.py/`
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        })

        const results = await page.evaluate(() => {
            const parseFamiliar = [
                {
                    moneda: "Dolar",
                    clase: '#cotizaciones > div > div.row > div:nth-child(1)'
                },
                {
                    moneda: "Peso Argentino",
                    clase: '#cotizaciones > div > div.row > div:nth-child(3)'
                },
                {
                    moneda: "Real",
                    clase: '#cotizaciones > div > div.row > div:nth-child(4)'
                },
                {
                    moneda: "Euro",
                    clase: '#cotizaciones > div > div.row > div:nth-child(5)'
                }
            ]
            let response: ExchangesDocument[] = []
            
            parseFamiliar.map((dataMoney) => {
                const compra = document.querySelectorAll(dataMoney.clase)[0].children[1].children[0].textContent.trim().replace('C:', '').replace('.', '')
                const venta = document.querySelectorAll(dataMoney.clase)[0].children[1].children[1].textContent.trim().replace('V:', '').replace('.', '')
                
                response.push({
                    entityBank: 'Banco Familiar',
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