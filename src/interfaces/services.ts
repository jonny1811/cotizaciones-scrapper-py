export interface Service {
    getExchangeData: () => Promise<ExchangeData[]>
}

export interface ExchangeData {
    id?: string
    entityBank: string
    name: string
    buyPrice: number
    sellPrice: number
    spread: number
    date: string
}