import { Request, Response, Router } from "express"
import { KnxGroupAddressService } from "@/services/knx-address/defs"
import { KnxGroupAddressValueService } from "@/services/knx-address/values"
import { KnxGroupAddress } from "@/typings"
import { Promise } from 'bluebird'

const KnxDatapoints = require('knx-datapoints')

export const decodeBuffer = ( dpt: string, value: any = null ) => {
	if ( !KnxDatapoints.isDptValid(dpt) ) {
		return {
			error: 'invalid data point type',
			dpt,
		}
	}

	if ( !KnxDatapoints.isDptSupported(dpt) ) {
		return {
			error: 'unsupported data point type',
			dpt,
		}
	}

	if ( value === null ) {
		return null
	}

	try {
		return KnxDatapoints.decode(dpt, Buffer.from(value, 'hex'))
	} catch ( err ) {
		return {
			error: 'buffer cannot be decoded',
			dpt,
			value,
		}
	}
}

const getAllCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const knxGroupAddressService = new KnxGroupAddressService()
		const knxGroupAddressValueService = new KnxGroupAddressValueService()
		const knxGroupAddressDefs: Required<KnxGroupAddress>[] = await knxGroupAddressService.getAll()

		const response: any = []

		await Promise.each(knxGroupAddressDefs, async ( def: Required<KnxGroupAddress> ) => {
			const item = await knxGroupAddressValueService.getById(def._id)

			let value: any

			try {
				value = decodeBuffer(def.dataPointType, item?.value)
			} catch ( err ) {
				value = {
					error: ''
				}
			}

			response.push({
				...def,
				value,
			})
		})

		res.send(response)
	} catch ( err: any ) {
		console.log(err)
		res.status(500).send()
	}
}

const getByIdCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const knxGroupAddressService = new KnxGroupAddressService()
		const { _id } = req.params
		const knxGroupAddressDef = await knxGroupAddressService.getById(_id)
		res.send(knxGroupAddressDef)
	} catch ( err: any ) {
		console.log(err)
		res.status(500).send()
	}
}

const propagateCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const knxGroupAddressValueService = new KnxGroupAddressValueService()

		const { _id } = req.params
		const { value, dataPointType } = req.body

		const response = await knxGroupAddressValueService.propagate(_id, value, dataPointType)

		res.send(response)
	} catch ( err: any ) {
		console.log(err)
		res.status(500).send()
	}
}

const readValueByKnxGroupAddressCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const knxGroupAddressValueService = new KnxGroupAddressValueService()

		const { _id } = req.params

		const response = await knxGroupAddressValueService.readValueByKnxGroupAddress(_id)

		res.send(response)
	} catch ( err: any ) {
		console.log(err)
		res.status(500).send()
	}
}

export const knxGroupAddressValuesRoutes = Router()
	.get('/', getAllCb)
	.get('/:_id/read-group-address-value', readValueByKnxGroupAddressCb)
	.get('/:_id', getByIdCb)
	.post('/:_id/propagate', propagateCb)
