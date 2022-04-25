import mongoose from "mongoose"
import { collection } from "@/models/knx-group-address"
import { KnxGroupAddress } from "@/typings"
import { connection } from "@/infrastructure/knx-client"
import { redisService } from "@/index"

const KnxDatapoints = require('knx-datapoints')

export class KnxGroupAddressValueService {
	async getById( _id: string ): Promise<any> {
		const knxGroupAddress: KnxGroupAddress = await mongoose.model(collection).findOne({ _id }).lean()

		if ( !knxGroupAddress ) {
			throw new Error(`knx group address by id=${ _id } not found in "${ collection }"`)
		}

		const serialized = await redisService?.read(knxGroupAddress.address)

		try {
			return JSON.parse(serialized)
		} catch ( err: any ) {
			return null
		}
	}

	async getAll(): Promise<KnxGroupAddress[]> {
		return mongoose.model(collection).find().lean()
	}

	async propagate( _id: string, value: any, dataPointType: string ): Promise<boolean> {
		const knxGroupAddress: KnxGroupAddress = await mongoose.model(collection).findOne({ _id }).lean()

		if ( !knxGroupAddress ) {
			throw new Error(`knx group address by id=${ _id } not found in "${ collection }"`)
		}

		return new Promise((( resolve, reject ) => {
			try {
				connection.write(
					knxGroupAddress.address,
					value,
					'DPT' + knxGroupAddress.dataPointType,
					( ignore: any ) => {
						const payload = { src: '1.0.201', groupAddress: knxGroupAddress.address, value: KnxDatapoints.encode(dataPointType, value) }
						redisService?.save(knxGroupAddress.address, payload)
						resolve(true)
					}
				)
			} catch ( err ) {
				reject()
			}
		}))
	}

	async readValueByKnxGroupAddress( _id: string ) {
		const knxGroupAddress: KnxGroupAddress = await mongoose.model(collection).findOne({ _id }).lean()

		if ( !knxGroupAddress ) {
			throw new Error(`readFromKnxGroupAddress(): KNX group address for _id: ${ _id } could not been found!`)
		}

		return connection.read(knxGroupAddress.address, ( src: any, responseValue: any ) => {
			console.log('=>', src, responseValue)
		})
	}
}
