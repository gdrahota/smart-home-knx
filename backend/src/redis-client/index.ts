import { createClient } from 'redis'
import { Promise } from 'bluebird'

export const connectToRedis = async (): Promise<any> => {
	const options = {
		url: process.env.REDIS_URL || 'redis://localhost:6379'
	}

	const client = createClient(options)

	let errorCount = 0

	client.on('error', ( err ) => {
		errorCount++
		console.log('!! Redis Client Error !!', errorCount, err)
	})

	client.on('connect', () => {
		console.log('=> Redis client connected to Redis server')
	})

	await client.connect()

	return client
}
