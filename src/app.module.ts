import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import { AppVersionModule } from './app-version/app-version.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://115.159.28.38/app_version'), AppVersionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
