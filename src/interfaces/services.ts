import { ExchangesDocument } from "../exchanges/exchanges.types";

export interface Service {
    getExchangeData: () => Promise<ExchangesDocument[]>
}
