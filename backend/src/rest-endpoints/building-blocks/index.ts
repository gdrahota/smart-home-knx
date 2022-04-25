import { Request, Response, Router } from "express"
import { BuildingBlockService } from "@/services/building-blocks"
import { errorHandler } from "@/rest-endpoints/error-handler"

const buildingBlockService = new BuildingBlockService()

const getAllCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const rooms = await buildingBlockService.getAll()
		res.send(rooms)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const getByIdCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const { _id } = req.params
		const room = await buildingBlockService.getById(_id)
		res.send(room)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const saveCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const room = await buildingBlockService.save(req.body)
		res.send(room)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const createCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const room = await buildingBlockService.create(req.body)
		res.send(room)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const removeCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const { _id } = req.params
		const response = await buildingBlockService.remove(_id)
		res.send(response)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

export const buildingBlockRoutes = Router()
	.get('/', getAllCb)
	.get('/:_id', getByIdCb)
	.put('/:_id', saveCb)
	.post('/', createCb)
	.delete('/:_id', removeCb)
