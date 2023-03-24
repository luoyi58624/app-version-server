export class UploadAppVersionDto {
	readonly versionName: string
	readonly versionNum: number
	readonly updateDesc: string[]
}

export class CreateAppVersionDto extends UploadAppVersionDto{
	readonly appName: string
	readonly downloadUrl: string
}
