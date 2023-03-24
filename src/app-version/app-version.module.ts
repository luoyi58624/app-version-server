import { Module } from '@nestjs/common'
import { AppVersionService } from './app-version.service'
import { AppVersionController } from './app-version.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { AppVersion, AppVersionSchema } from './entities/app-version.entity'

@Module({
	imports: [MongooseModule.forFeature([{ name: AppVersion.name, schema: AppVersionSchema }])],
	controllers: [AppVersionController],
	providers: [AppVersionService]
})
export class AppVersionModule {}
