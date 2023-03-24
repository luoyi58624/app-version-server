import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common'
import { AppVersionService } from './app-version.service'
import { CreateAppVersionDto, UploadAppVersionDto } from './dto/create-app-version.dto'
import { UpdateAppVersionDto } from './dto/update-app-version.dto'
import * as fs from 'fs'
import { FileInterceptor } from '@nestjs/platform-express'
import { join } from 'path'

@Controller('app-version')
export class AppVersionController {
	constructor(private readonly appVersionService: AppVersionService) {}

	@Post()
	create(@Body() createAppVersionDto: CreateAppVersionDto) {
		return this.appVersionService.create(createAppVersionDto)
	}

	@Get()
	async findAll() {
		return {
			code: 200,
			data: await this.appVersionService.findAll()
		}
	}

	@Get('newVersion')
	async getNewVersion() {
		return {
			code: 200,
			data: await this.appVersionService.getNewVersion()
		}
	}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadApp(@UploadedFile() file: Express.Multer.File, @Body() data: UploadAppVersionDto) {
		fs.writeFileSync(`./public/${decodeURIComponent(escape(file.originalname))}`, file.buffer)
		await this.appVersionService.create({
			appName: file.originalname,
			versionName: data.versionName,
			versionNum: data.versionNum,
			updateDesc: data.updateDesc,
			downloadUrl: `/${decodeURIComponent(escape(file.originalname))}`
		})
		return {
			code: 200,
			message: '上传成功',
			data: null
		}
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.appVersionService.findOne(id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAppVersionDto: UpdateAppVersionDto) {
		return this.appVersionService.update(id, updateAppVersionDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return {
			code: 200,
			message: '删除成功',
			data: await this.appVersionService.remove(id)
		}
	}
}
