import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { Service } from '../interfaces';
import { ExchangesDocument } from '../exchanges/exchanges.types';

@Injectable()
export class CambiosChacoService implements Service {
    async getExchangeData() {
        // const URL = `https://www.cambioschaco.com.py/`
        // const browser = await puppeteer.launch({ headless: true })
        // const page = await browser.newPage()
        // await page.goto(URL, {
        //     waitUntil: 'networkidle2'
        // })

        // const results = await page.evaluate(() => {
        //     const parseCambiosChaco = [
        //         {
        //             moneda: "Dolar",
        //             clase: '#exchange-usd'
        //         },
        //         {
        //             moneda: "Peso Argentino",
        //             clase: '#exchange-ars'
        //         },
        //         {
        //             moneda: "Real",
        //             clase: '#exchange-brl'
        //         },
        //         {
        //             moneda: "Euro",
        //             clase: '#exchange-eur'
        //         }
        //     ]
        //     let response: ExchangesDocument[] = []
            
        //     parseCambiosChaco.map((dataMoney) => {
        //         const compra = document.querySelectorAll(dataMoney.clase)[0].children[1].children[0].textContent.trim().replace('.', '')
        //         const venta = document.querySelectorAll(dataMoney.clase)[0].children[2].children[0].textContent.trim().replace('.', '')
                
        //         response.push({
        //             entityBank: 'Cambios Chaco',
        //             name: dataMoney.moneda,
        //             buyPrice: parseInt(compra),
        //             sellPrice: parseInt(venta),
        //             spread: parseInt(venta) - parseInt(compra),
        //             date: new Date().toISOString()
        //         } as ExchangesDocument)
        //     })


        //     return response
        // })

        // await browser.close()
        return null
    }
}
