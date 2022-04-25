import mongoose from 'mongoose'
import { collection } from '@/models/tag-category'
import { NewTagCategory, TagCategory } from "@/typings"

export class TagCategoryService {
	async getAll(): Promise<TagCategory[]> {
		return mongoose.model<any>(collection).find()
	}

	async getById( _id: string ): Promise<TagCategory[]> {
		return mongoose.model<any>(collection).findOne({ _id }).lean()
	}

	async create( item: NewTagCategory ): Promise<NewTagCategory> {
		return mongoose.model<any>(collection).create(item)
	}

	async save( item: TagCategory ): Promise<TagCategory | null> {
		const option = { new: true }
		return mongoose.model<any>(collection).findOneAndUpdate({ _id: item._id }, item, option).lean()
	}

	async remove( _id: string ): Promise<TagCategory | null> {
		return mongoose.model<any>(collection).findOneAndRemove({ _id })
	}
}
