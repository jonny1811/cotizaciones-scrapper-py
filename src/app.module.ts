import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapperModule } from './scrappers/scrappers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://raondup:rdwqjY5e6HBZzBAV@cluster0.3vglm.mongodb.net/exchangesquotes',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    ScrapperModule,
  ],
  providers: []
})
export class AppModule { }
