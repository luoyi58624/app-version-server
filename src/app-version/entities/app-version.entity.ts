import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AppVersionDocument = HydratedDocument<AppVersion>

@Schema()
export class AppVersion {
	@Prop()
	appName: string

	@Prop()
	versionName: string

	@Prop()
	versionNum: number

	@Prop([String])
	updateDesc: string[]

	@Prop()
	downloadUrl: string
}

export const AppVersionSchema = SchemaFactory.createForClass(AppVersion)
