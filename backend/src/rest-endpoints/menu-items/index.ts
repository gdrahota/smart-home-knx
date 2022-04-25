import { Request, Response, Router } from 'express'
import { MenuItemService } from '@/services/menu-items'
import { errorHandler } from '../error-handler'

const getMenuItems = async ( req: Request, res: Response ): Promise<void> => {
	try {
		const items = await MenuItemService.getAll()
		res.send(items)
	} catch ( err ) {
		errorHandler(req, res, err)
	}
}

const updateMenuItem = async ( req: Request, res: Response ): Promise<void> => {
	try {
		res.send(await MenuItemService.save(req.body))
	} catch ( err ) {
		errorHandler(req, res, err)
	}
}

const addMenuItem = async ( req: Request, res: Response ): Promise<void> => {
	try {
		res.send(await MenuItemService.create(req.body))
	} catch ( err ) {
		errorHandler(req, res, err)
	}
}
const deleteMenuItem = async ( req: Request, res: Response ): Promise<void> => {
	try {
		await MenuItemService.remove(req.params.id)
		res.send(req.body.id)
	} catch ( err ) {
		errorHandler(req, res, err)
	}
}

export const menuItemRoutes = Router()
	.get('/', getMenuItems)
	.post('/', addMenuItem)
	.put('/:id', updateMenuItem)
	.delete('/:id', deleteMenuItem)
