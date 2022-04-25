import mongoose from 'mongoose'
import { collection } from '@/models/tags'
import { NewTag, Tag } from "@/typings"

export class TagService {
	async getAll(): Promise<Tag[]> {
		return mongoose.model<any>(collection).find()
	}

	async getById( _id: string ): Promise<Tag[]> {
		return mongoose.model<any>(collection).findOne({ _id }).lean()
	}

	async create( item: NewTag ): Promise<NewTag> {
		return mongoose.model<any>(collection).create(item)
	}

	async save( item: Tag ): Promise<Tag | null> {
		const option = { new: true }
		return mongoose.model<any>(collection).findOneAndUpdate({ _id: item._id }, item, option).lean()
	}

	async remove( _id: string ): Promise<Tag | null> {
		return mongoose.model<any>(collection).findOneAndRemove({ _id })
	}

	async removeBuildingBlock( _id: string, buildingBlockId: string ) {
		return mongoose.model(collection).updateOne({ _id }, { $pull: { buildingBlocks: buildingBlockId } })
	}

	async addBuildingBlock( _id: string, buildingBlockId: string ) {
		return mongoose.model(collection).updateOne({ _id }, { $push: { buildingBlocks: buildingBlockId } })
	}
}
