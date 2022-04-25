import mongoose from 'mongoose'
import { collection } from '@/models/menu-item'

interface IMenuFeature {
	group: string
	name: string
	instanceId: string
}

export interface iMenuItem {
	_id?: string
	name: string
	parentId: number | null
	feature?: IMenuFeature
	icon: string | null
	iconColor: string | null
	insertSeparatorAfter: boolean | null,
	updatedAt: Date
}

export class MenuItemService {
	static async getAll(): Promise<iMenuItem[]> {
		return mongoose.model<any>(collection).find()
	}

	static async create( item: iMenuItem ): Promise<iMenuItem> {
		return mongoose.model<any>(collection).create(item)
	}

	static async save( item: iMenuItem ): Promise<iMenuItem | null> {
		const itemToSave: iMenuItem = {
			...item,
			updatedAt: new Date(),
		}

		const option = { new: true }

		return mongoose.model<any>(collection).findOneAndUpdate({ _id: item._id }, itemToSave, option)
	}

	static async remove( _id: string ): Promise<iMenuItem | null> {
		return mongoose.model<any>(collection).findOneAndRemove({ _id })
	}
}
