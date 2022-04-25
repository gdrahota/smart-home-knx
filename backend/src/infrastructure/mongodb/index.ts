import mongoose from 'mongoose'
import { registerModels } from "@/models"

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/sh-smart-home'

export const connectToMongoDb = async (): Promise<mongoose.Connection> => {
	const { NODE_ENV } = process.env

	const url = ['development', undefined].includes(NODE_ENV)
		? MONGO_DB_URL
		: `${ MONGO_DB_URL }-${ NODE_ENV }`

	const options: any = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}

	mongoose.connect(url, options)

	registerModels()

	return mongoose.connection
}
