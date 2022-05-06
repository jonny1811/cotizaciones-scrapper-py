import { Module } from '@nestjs/common';
import { ScrapperModule } from './scrappers/scrappers.module';

@Module({
  imports: [ScrapperModule],
  providers: []
})
export class AppModule {}
