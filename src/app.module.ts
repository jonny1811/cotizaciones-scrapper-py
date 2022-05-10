import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScrapperModule } from './scrappers/scrappers.module'
import { ExchangesModule } from './exchanges/exchanges.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("mongoDbUrl"),
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService]
    }),
    ScrapperModule,
    ExchangesModule,
  ],
  providers: []
})
export class AppModule { }
