import { ExchangeData } from "./exchanges";

export interface Service {
    getExchangeData: () => Promise<ExchangeData[]>
}
