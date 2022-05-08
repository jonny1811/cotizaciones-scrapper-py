export interface ExchangeRepository {
    findAll(): Promise<ExchangeData[]>
    findById(id: string): Promise<ExchangeData | null>
    save(data: ExchangeData): Promise<void>
    update(id: string, data: ExchangeData): Promise<void>
    delete(id: string): Promise<void>
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
