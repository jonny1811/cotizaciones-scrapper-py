import { CreateExchangesDTO } from '../exchanges/dto/create-exchanges.dto';

export interface Service {
    getExchangeData: () => Promise<CreateExchangesDTO>
}
