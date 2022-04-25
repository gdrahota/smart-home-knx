import mongoose, { Document, Model, Schema } from 'mongoose'

export const collection = 'knxGroupAddresses'

export const KnxGroupAddressSchema = new Schema({
	address: {
		type: String,
		required: true,
	},
	dataPointType: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
}, {
	collection,
	minimize: true,
})

export let KnxGroupAddress: Model<Document> | null = null

export const registerKnxGroupAddressModel = () => {
	KnxGroupAddress = mongoose.model(collection, KnxGroupAddressSchema)
}
