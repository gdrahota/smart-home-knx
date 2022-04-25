import { Request, Response, Router } from "express"
import { TagCategoryService } from "@/services/tag-category"
import { errorHandler } from "@/rest-endpoints/error-handler"

const tagCategoryService = new TagCategoryService()

const getAllCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const items = await tagCategoryService.getAll()
		res.send(items)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const getByIdCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const { _id } = req.params
		const item = await tagCategoryService.getById(_id)
		res.send(item)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const saveCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const item = await tagCategoryService.create(req.body)
		res.send(item)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

const removeCb = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const { _id } = req.params
		const response = await tagCategoryService.remove(_id)
		res.send(response)
	} catch ( err: any ) {
		errorHandler(req, res, err)
	}
}

export const tagCategoryRoutes = Router()
	.get('/', getAllCb)
	.get('/:_id', getByIdCb)
	.put('/:_id', saveCb)
	.post('/', saveCb)
	.delete('/:_id', removeCb)
