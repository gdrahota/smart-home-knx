import mongoose from "mongoose"
import { collection } from "@/models/knx-group-address"
import { KnxGroupAddress } from "@/typings"

export class KnxGroupAddressService {
	async save( item: KnxGroupAddress ): Promise<KnxGroupAddress> {
		if ( item._id ) {
			await mongoose.model(collection).updateOne({ _id: item._id }, item).lean()
			return this.getById(item._id)
		} else {
			// @ts-ignore
			return mongoose.model(collection).create(item)
		}
	}

	async getById( _id: string ): Promise<KnxGroupAddress> {
		return mongoose.model(collection).findOne({ _id }).lean()
	}

	async getByAddress( address: string ): Promise<KnxGroupAddress> {
		return mongoose.model(collection).findOne({ address }).lean()
	}

	async remove( _id: string ): Promise<any> {
		return mongoose.model(collection).deleteOne({ _id })
	}

	async getAll(): Promise<Required<KnxGroupAddress>[]> {
		return mongoose.model(collection).find().sort({ address: 1 }).lean()
	}
}
