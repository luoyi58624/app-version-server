import { Injectable } from '@nestjs/common'
import { CreateAppVersionDto } from './dto/create-app-version.dto'
import { UpdateAppVersionDto } from './dto/update-app-version.dto'
import { InjectModel } from '@nestjs/mongoose'
import { AppVersion, AppVersionDocument } from './entities/app-version.entity'
import { Model } from 'mongoose'

@Injectable()
export class AppVersionService {
	constructor(@InjectModel(AppVersion.name) private appVersionModel: Model<AppVersionDocument>) {}

	async create(createCatDto: CreateAppVersionDto): Promise<AppVersion> {
		const createdCat = new this.appVersionModel(createCatDto)
		return createdCat.save()
	}

	async findAll(): Promise<AppVersion[]> {
		return this.appVersionModel.find().sort({ versionNum: -1 }).exec()
	}

	findOne(id: string) {
		return `This action returns a #${id} appVersion`
	}

	update(id: string, updateAppVersionDto: UpdateAppVersionDto) {
		return `This action updates a #${id} appVersion`
	}

	remove(id: string) {
		return this.appVersionModel.deleteOne({ _id: id })
	}

	getNewVersion() {
		return this.appVersionModel.find().sort({ versionNum: -1 }).limit(1).exec()
	}
}
