export interface BaseRepository<T> {
    findAll(): Promise<T[]>
    findById(id: string): Promise<T | null>
    save(data: T): Promise<void>
    update(id: string, data: T): Promise<void>
    delete(id: string): Promise<void>
}
