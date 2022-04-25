import { Request, Response, Router } from "express"
import { KnxGroupAddressService } from "@/services/knx-address/defs"
import { errorHandler } from "@/rest-endpoints/error-handler"

const getAllCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const knxGroupAddressService = new KnxGroupAddressService()
		const knxGroupAddressDefs = await knxGroupAddressService.getAll()
		res.send(knxGroupAddressDefs)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const getByIdCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const knxGroupAddressService = new KnxGroupAddressService()
		const { _id } = req.params
		const knxGroupAddressDef = await knxGroupAddressService.getById(_id)
		res.send(knxGroupAddressDef)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const saveCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const knxGroupAddressService = new KnxGroupAddressService()
		const knxGroupAddressDef = await knxGroupAddressService.save(req.body)
		res.send(knxGroupAddressDef)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const removeCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const knxGroupAddressService = new KnxGroupAddressService()
		const { _id } = req.body
		const response = await knxGroupAddressService.remove(_id)
		res.send(response)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

export const knxGroupAddressDefRoutes = Router()
	.get('/', getAllCb)
	.get('/:_id', getByIdCb)
	.put('/:_id', saveCb)
	.post('/', saveCb)
	.delete('/:_id', removeCb)
