import { Request, Response, Router } from "express"
import { errorHandler } from "@/rest-endpoints/error-handler"
import { TagService } from "@/services/tag"

const tagService = new TagService()

const getAllCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const items = await tagService.getAll()
		res.send(items)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const getByIdCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const { _id } = req.params
		const item = await tagService.getById(_id)
		res.send(item)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const saveCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const item = await tagService.create(req.body)
		res.send(item)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const removeCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const { _id } = req.params
		const response = await tagService.remove(_id)
		res.send(response)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const removeBuildingBlockCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const { _id, buildingBlockId } = req.params
		await tagService.removeBuildingBlock(_id, buildingBlockId)
		const response = await tagService.getById(_id)
		res.send(response)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const addBuildingBlockCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const { _id, buildingBlockId } = req.params
		await tagService.addBuildingBlock(_id, buildingBlockId)
		const response = await tagService.getById(_id)
		res.send(response)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

export const tagRoutes = Router()
	.get('/', getAllCb)
	.get('/:_id', getByIdCb)
	.put('/:_id', saveCb)
	.post('/', saveCb)
	.post('/:_id/building-blocks/:buildingBlockId', addBuildingBlockCb)
	.delete('/:_id/building-blocks/:buildingBlockId', removeBuildingBlockCb)
	.delete('/:_id', removeCb)
