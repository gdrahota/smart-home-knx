import { KnxGroupAddressService } from "@/services/knx-address/defs"
import { Promise } from "bluebird"
import { decodeBuffer } from "@/rest-endpoints/knx-addresses/values"
import { io } from "@/infrastructure/websocket"

export class RedisService {
	private knxGroupAddressService = new KnxGroupAddressService()

	constructor( private readonly redisClient: any ) {
	}

	async save( key: string, msg: any ): Promise<void> {
		const valueObj = await this.knxGroupAddressService.getByAddress(msg.groupAddress)

		if ( valueObj ) {
			try {
				const decodedValue = decodeBuffer(valueObj.dataPointType, msg.value)
				const enhancedMsg = {
					...valueObj,
					value: decodedValue,
					timestamp: new Date(),
				}
				io.to('knx').emit('KNX_DATAPOINT_UPDATE', enhancedMsg)
			} catch ( err ) {
			}
		}

		return this.redisClient.set(key, JSON.stringify({ ...msg, timestamp: new Date() }))
	}

	async read( key: string ): Promise<any> {
		return this.redisClient.get(key)
	}

	async readAll(): Promise<void> {
		const responses: any = {}
		const keys = await this.redisClient.sendCommand(["keys", "*"])
		await Promise.each(keys, async ( key: string ) => responses[key] = await this.read(key))
		return responses
	}
}
