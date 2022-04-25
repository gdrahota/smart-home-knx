import mongoose from 'mongoose'
import { collection } from '@/models/building-block'
import { BuildingBlock } from "@/typings"

export class BuildingBlockService {
	async getAll(): Promise<BuildingBlock[]> {
		return mongoose.model<any>(collection).find()
	}

	async getById( _id: string ): Promise<BuildingBlock[]> {
		return mongoose.model<any>(collection).findOne({ _id }).lean()
	}

	async create( item: Omit<BuildingBlock, '_id'> ): Promise<BuildingBlock> {
		return mongoose.model<any>(collection).create(item)
	}

	async save( item: BuildingBlock ): Promise<BuildingBlock | null> {
		const option = { new: true }
		return mongoose.model<any>(collection).findOneAndUpdate({ _id: item._id }, item, option).lean()
	}

	async remove( _id: string ): Promise<BuildingBlock | null> {
		return mongoose.model<any>(collection).findOneAndRemove({ _id })
	}
}
