import express from 'express'
import http from 'http'
import { connectToMongoDb } from './infrastructure/mongodb'

import { connectToRedis } from "@/redis-client"
import { bindWebSocketToServer } from "@/infrastructure/websocket"
import { serveStaticFiles } from "@/infrastructure/serve-static-files"
import { routes } from "@/rest-endpoints"
import { connectToKnx } from "@/infrastructure/knx-client"
import { RedisService } from "@/services/redis"

export let redisService: any

class App {
	private redisClient: any
	private readonly app: any
	private readonly server: any

	constructor() {
		const ip = require('ip')
		console.log('=> backend\'s ip address is', ip.address())

		this.app = express()
		this.server = http.createServer(this.app)
	}

	async connectToRedis() {
		this.redisClient = await connectToRedis()

		if ( this.redisClient === null ) {
			process.exit(1)
		}
	}

	async connectToMongodb() {
		await connectToMongoDb()
	}

	async startWebSockets() {
		await bindWebSocketToServer(this.server)
	}

	async connectToKnx() {
		redisService = new RedisService(this.redisClient)
		await connectToKnx(new RedisService(this.redisClient))
	}

	registerMiddleware() {
		this.app.use(express.json())
		this.app.use('/api', routes)
		serveStaticFiles(this.app)
		this.app.use(express.static('public'))
	}

	public get redisService(): RedisService {
		return this.redisService
	}
}

export const app = new App()

const start = async () => {
	try {
		await app.connectToRedis()
		await app.connectToMongodb()
		await app.startWebSockets()
		await app.connectToKnx()
		app.registerMiddleware()
	} catch ( err: any ) {
		console.error(err)
	}
}

(async () => {
	await start()
})()

process.on('exit', function ( code ) {
	return console.error(`About to exit with code ${ code }`)
})

process.on('SIGINT', function ( code ) {
	process.exit()
})
